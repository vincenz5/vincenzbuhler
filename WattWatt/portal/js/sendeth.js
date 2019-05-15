// Transfer function called by button push
function PayE() {
    console.log("Thank you!")
    var escrowContract = "0x2ac4a0788FfCc9fb1E50F8BF81535974D8A1b710";
    var src =  web3.eth.accounts[0];
    var payee = "0x76c67F724d155bf2725350bDF809460f5636bEc9";
    // var wad = 1000000000000000000;
    var Amount =  document.getElementById('amount').value;
    var B =  web3.toWei(Amount, "ether");

    var payContractABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "recipient",
                    "type": "address"
                }
            ],
            "name": "transferPrimary",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "payee",
                    "type": "address"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "primary",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "payee",
                    "type": "address"
                }
            ],
            "name": "depositsOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "payee",
                    "type": "address"
                }
            ],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "payee",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "weiAmount",
                    "type": "uint256"
                }
            ],
            "name": "Deposited",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "payee",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "weiAmount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawn",
            "type": "event"
        }
    ]

    var PayContract = web3.eth.contract(payContractABI);
    var payContract = PayContract.at(escrowContract);

    // web3.eth.getBlock(48, function (error, result) {
    //     if (!error)
    //         console.log(JSON.stringify(result));
    //     else
    //         console.error(error);
    // })
    // one USD: 10000000000000000
    // donationContract.deposit(payee, { "from": web3.eth.accounts[0] })
    // console.log(donationContract)
    // var b = web3.toWei(wad, "ether")

    payContract.deposit(payee, { gas: 200000, value: B }, console.log)
        // donationContract.deposit(payee, { gas: 200000, value: Amount }, console.log)
        // .on("receipt", function (receipt) {
        //     $("#txStatus").text("Thank you for your donation! ");
        // })
        // .on("error", function (error) {
        //     // Do something to alert the user their transaction has failed
        //     $("#txStatus").text(error);
        // });
    var accountInterval = setInterval(function () {
        // Check if account has changed
        if (web3.eth.accounts[0] !== userAccount) {
            userAccount = web3.eth.accounts[0];
            // Call a function to update the UI with the new account
            // getDonationsByOwner(userAccount)
            //     .then(displayDonations);
        }
    }, 10000);


    // var inWei = web3.toWei('10', 'ether')
    // function listenForClicks(miniToken) {
    //     var button = document.querySelector('button.transferFunds')
    //     button.addEventListener('click', function () {
    //         miniToken.transfer(toAddress, value, { from: addr })
    //             .then(function (txHash) {
    //                 console.log('Transaction sent')
    //                 console.dir(txHash)
    //                 waitForTxToBeMined(txHash)
    //             })
    //             .catch(console.error)
    //     })
    // }

    async function waitForTxToBeMined(txHash) {
        let txReceipt
        while (!txReceipt) {
            try {
                txReceipt = await eth.getTransactionReceipt(txHash)
            } catch (err) {
                return indicateFailure(err)
            }
        }
    }
}

// 0xDBED4B80cCD377DD536FD4d4c86de9A8dBbC7BB9