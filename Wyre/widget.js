class Widget {
    constructor(_init, debug = false) {
        this.debug = debug;
        this.queue = [];
        this.ready = false;
        this.eventRegistrations = new Map();
        if (_init.env == null)
            _init.env = "production";
        this.init = this.processClassicInit(_init);
        this.validateInit();
        this.attachEvents();
        this.configureGoogleAnalytics();
        this.createIframe(); // todo should we really do this here?
    }
    removeListener(event, listener) {
        let v = this.eventRegistrations.get(event) || [];
        v = v.filter(c => c !== listener);
        this.eventRegistrations.set(event, v);
    }
    removeAllListeners(event) {
        if (!!event) {
            this.eventRegistrations.set(event, []);
        }
        else {
            this.eventRegistrations = new Map();
        }
    }
    on(event, handler) {
        if (!event)
            throw new Error("must supply an event!");
        let v = this.eventRegistrations.get(event) || [];
        v.push(handler);
        this.eventRegistrations.set(event, v);
    }
    open() {
        if (!this.iframe) {
            this.createIframe();
        }
        else {
            this.send('open', {});
        }
        this.iframe.style.display = "block";
    }
    emit(event, payload) {
        let v = this.eventRegistrations.get(event) || [];
        v.forEach(_v => {
            try {
                _v(payload || {});
            }
            catch (e) {
                console.warn("subscribed widget event handler failure: ", e);
            }
        });
    }
    validateInit() {
        switch (this.init.auth.type) {
            case 'secretKey':
                // If an error has occurred don't validate secretKey
                if (this.init.error)
                    return;
                let k = this.init.auth.secretKey;
                if (k.length < 25) {
                    console.error("Diligently refusing to accept a secret key with length < 25");
                    this.emit('close', { error: 'supplied secretKey is too short' });
                    return;
                }
                break;
        }
    }
    send(type, payload) {
        this.queue.push({ type, payload });
        this.flush();
    }
    flush() {
        if (!this.ready)
            return;
        // console.log("flushing queue: ", this.queue);
        this.queue.forEach(v => this.iframe.contentWindow.postMessage(JSON.stringify(v), "*")); // todo (security) this should be a wyre origin, i think
        this.queue = [];
    }
    attachEvents() {
        let eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        let messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
        window[eventMethod](messageEvent, (e) => {
            if (typeof e.data != 'string')
                return;
            if (e.data.indexOf('{') != 0)
                return;
            let frame = JSON.parse(e.data);
            if (!frame.type)
                return;
            switch (frame.type) {
                case "ready":
                    this.ready = true;
                    if (frame.payload && !frame.payload.web3Enabled && typeof web3 !== 'undefined') {
                        this.init.web3PresentInParentButNotChild = true;
                    }
                    else {
                        this.init.web3PresentInParentButNotChild = false;
                    }
                    if (ga && frame.payload && frame.payload.gaTrackingCode) {
                        ga('create', frame.payload.gaTrackingCode, 'auto');
                        ga((tracker) => {
                            // Gets the client ID of the default tracker.
                            var clientId = tracker.get('clientId');
                            this.init.googleAnalyticsClientId = clientId;
                            this.init.googleAnalyticsReferrer = document.referrer;
                            this.send('init', this.init);
                            this.emit('ready');
                        });
                    }
                    else {
                        this.send('init', this.init);
                        this.emit('ready');
                    }
                    break;
                case "close":
                case "complete":
                    this.close();
                    this.emit(frame.type, frame.payload);
                    break;
                case "sign-request":
                    let signRequest = frame.payload;
                    let signRequestWeb3js = new Web3(web3.currentProvider);
                    signRequestWeb3js.personal.sign(signRequestWeb3js.fromUtf8(signRequest.message), signRequest.address, (error, signature) => {
                        this.send("sign-response", {
                            signature: signature,
                            error: error
                        });
                    });
                    break;
                case "provider-name":
                    let providerName = this.getNameOfProvider();
                    this.send("provider-name", providerName);
                    break;
                case "accounts":
                    let accountsWeb3js = new Web3(web3.currentProvider);
                    let accounts = accountsWeb3js.eth.accounts;
                    this.send("accounts-response", { accounts });
                    break;
                default:
            }
        }, false);
    }
    close() {
        document.body.removeChild(this.iframe);
        this.iframe = null;
        this.queue = [];
        this.ready = false;
    }
    createIframe() {
        this.iframe = document.createElement('iframe');
        this.iframe.style.display = "none";
        this.iframe.style.border = "none";
        this.iframe.style.width = "100%";
        this.iframe.style.height = "100%";
        this.iframe.style.position = "fixed";
        this.iframe.style.zIndex = "999999";
        this.iframe.style.top = "0";
        this.iframe.style.left = "0";
        this.iframe.style.bottom = "0";
        this.iframe.style.right = "0";
        this.iframe.style.backgroundColor = "transparent";
        this.iframe.src = this.getBaseUrl() + "/loader?_cb=" + Math.round(new Date().getTime() / 1000);
        document.body.appendChild(this.iframe);
    }
    getBaseUrl() {
        switch (this.init.env) {
            case "test":
                return "https://verify.testwyre.com";
            case "staging":
                return "https://verify-staging.i.sendwyre.com";
            case "local":
                return "http://localhost:8890";
            case "local_https":
                return "https://localhost:8890";
            case "android_emulator":
                return "http://10.0.2.2:8890";
            case "production":
            default:
                return "https://verify.sendwyre.com";
        }
    }
    processClassicInit(_init) {
        if (_init.auth)
            return _init;
        // otherwise, convert the classic style to the new style
        let classic = _init;
        let newconfig = {
            env: classic.env,
            auth: {
                type: 'metamask'
            },
            operation: {
                type: 'onramp',
                destCurrency: classic.destCurrency
            },
            apiKey: classic.apiKey,
            web3PresentInParentButNotChild: false
        };
        if (classic.onExit) {
            this.on('close', function (r) {
                if (r.error)
                    classic.onExit(r.error);
                else
                    classic.onExit(null);
            });
        }
        if (classic.onSuccess)
            this.on('complete', function (r) { classic.onSuccess(); });
        console.debug("converted v1 config to v2, please use this instead: ", newconfig);
        return newconfig;
    }
    configureGoogleAnalytics() {
        try {
            if (ga) {
                return;
            }
        }
        catch (error) {
            var gaScriptTag = document.createElement('script');
            gaScriptTag.setAttribute('src', 'https://www.google-analytics.com/analytics.js');
            document.head.appendChild(gaScriptTag);
        }
    }
    getNameOfProvider() {
        if (web3.currentProvider.isTrust)
            return "trust";
        if (typeof __CIPHER__ !== 'undefined')
            return "cipher";
        if (typeof SOFA !== 'undefined')
            return "coinbase";
        if (web3.currentProvider.isDDEXWallet)
            return "ddex";
        return "metamask";
    }
}
module.exports = Object.assign(Widget, { Widget });
//# sourceMappingURL=widget.js.map