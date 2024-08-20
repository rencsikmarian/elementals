import {Elemental} from "../../index";

let responsiveElemental = Elemental("responsive", function (elemental, options) {
    // You get access to an object with access to the current DOM you are working in.
    // .name is the elemental name
    // .el is the javascript context
    // .destroy is the removal callable
    // .getInstance fetches an already instantiated instance in the current namespace
    // .getInstances fetches all elementals in the current namespace
    // .getInstanceFromElement fetches an elemental from another provided namespace
    // .pubSubClient is the event manager subscription
    elemental.el.innerHTML = 'Testing some text';
    console.log("init responsive");

    return {
        resume: function () {
            elemental.el.innerHTML = 'Testing some resumed text';
        },
        pause: function () {
            elemental.el.innerHTML = 'Testing some paused text';
        },
        // there is also a destroy method, although this is only for advanced usage
    }
});

export default responsiveElemental;