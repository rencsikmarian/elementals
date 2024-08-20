import {Elemental} from "../../index";

export default Object(Elemental)("responsiveTest", function (elemental, settings) {
    function setContent(content) {
        elemental.el.innerHTML = content
    }
    setContent("initialize");
    console.log("initialize");

    return {
        resume: function () {
            setContent("resumed")
            console.log("resumed")
        },
        pause: function () {
            setContent("paused")
            console.log("paused")
        }
    }
});