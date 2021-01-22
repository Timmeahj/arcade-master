/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/renderer/Renderer.js":
/*!*****************************************!*\
  !*** ./client/src/renderer/Renderer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => /* binding */ Renderer\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nclass Renderer {\r\n    constructor(fileName, location) {\r\n        this.fileName = fileName;\r\n        this.location = location;\r\n    }\r\n    render() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return fetch('view/' + this.fileName)\r\n                .then((response) => {\r\n                return response.text();\r\n            })\r\n                .then(Renderer.htmlToDom)\r\n                .then((view) => {\r\n                this.location.appendChild(view);\r\n            });\r\n        });\r\n    }\r\n    static htmlToDom(html) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let element = document.createElement('div');\r\n            element.innerHTML = html;\r\n            return element;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/renderer/Renderer.js?");

/***/ }),

/***/ "./client/src/index.ts":
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/Renderer.js */ \"./client/src/renderer/Renderer.js\");\n/* harmony import */ var _models_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Game */ \"./client/src/models/Game.ts\");\n\r\n\r\nconst game = new _models_Game__WEBPACK_IMPORTED_MODULE_1__.Game();\r\nconst renderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.menu.view, document.body);\r\nrenderer.render().then();\r\n\n\n//# sourceURL=webpack://server/./client/src/index.ts?");

/***/ }),

/***/ "./client/src/models/Arcade.ts":
/*!*************************************!*\
  !*** ./client/src/models/Arcade.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Arcade\": () => /* binding */ Arcade\n/* harmony export */ });\nclass Arcade {\r\n    constructor() {\r\n        this._view = 'arcade.html';\r\n    }\r\n    get view() {\r\n        return this._view;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Arcade.ts?");

/***/ }),

/***/ "./client/src/models/Game.ts":
/*!***********************************!*\
  !*** ./client/src/models/Game.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./client/src/models/Menu.ts\");\n/* harmony import */ var _Arcade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arcade */ \"./client/src/models/Arcade.ts\");\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this._menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__.Menu();\r\n        this._arcade = new _Arcade__WEBPACK_IMPORTED_MODULE_1__.Arcade();\r\n    }\r\n    get menu() {\r\n        return this._menu;\r\n    }\r\n    get arcade() {\r\n        return this._arcade;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Game.ts?");

/***/ }),

/***/ "./client/src/models/Menu.ts":
/*!***********************************!*\
  !*** ./client/src/models/Menu.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Menu\": () => /* binding */ Menu\n/* harmony export */ });\nclass Menu {\r\n    constructor() {\r\n        this._view = 'menu.html';\r\n    }\r\n    get view() {\r\n        return this._view;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Menu.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./client/src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;