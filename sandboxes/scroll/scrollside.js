window.addEventListener('load', function () {
    var controller = new ScrollMagic.Controller();
    console.log(controller);
    var wipeAnimation = new TimelineMax()

    .to("#slideContainer", 0.5, {z: -150})
    .to("#slideContainer", 1, {x: "-25%"})
    .to("#slideContainer", 0.5, {z: 0})

    .to("#slideContainer", 0.5, {z: -150, delay: 1})
    .to("#slideContainer", 1, {x: "-150%"})
    .to("#slideContainer", 0.5, {z: 0})

    .to("#slideContainer", 0.5, {z: -150, delay:1})
    .to("#slideContainer", 1, {x: "-75%"})
    .to("#slideContainer", 0.5, {z:0});

    new ScrollMagic.Scene({
        triggerElement: "#pinContainer",
        triggerHook: "onLeave",
        duration: "500%"
    })
    .setPin("#pinContainer")
    .setTween(wipeAnimation)
    .addIndictators()
    .addTo(controller);
});