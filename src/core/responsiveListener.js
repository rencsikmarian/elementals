import * as ResponsiveController from './viewport.js'
import {default as debounce} from './debounce.js';
import {addEventListener} from "./DOMEvents.js";

export default function () {
    addEventListener(window, "resize", debounce(function () {
        ResponsiveController.calculateViewport();
    }, 200, false))
}
