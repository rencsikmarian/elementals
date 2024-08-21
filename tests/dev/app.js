import {ElementalManager, Install} from "../../index.js";
import {default as dispatchingTest} from "./dispatchingTest.js";
import {default as responsiveTest} from "./responsiveTest.js";
import {default as multipleTest1} from "./multipleTest1.js";
import {default as multipleTest2} from "./multipleTest2.js";

ElementalManager.initElementals({
    "dispatchingTest": dispatchingTest,
    "responsiveTest": responsiveTest,
    "multipleTest1": multipleTest1,
    "multipleTest2": multipleTest2
}, document);

Install();
