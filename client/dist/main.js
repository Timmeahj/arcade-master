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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => /* binding */ Renderer\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nclass Renderer {\r\n    constructor(fileName, location) {\r\n        this.fileName = fileName;\r\n        this.location = location;\r\n    }\r\n    render() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return fetch('view/' + this.fileName)\r\n                .then((response) => {\r\n                return response.text();\r\n            })\r\n                .then(Renderer.htmlToDom)\r\n                .then((view) => {\r\n                while (this.location.firstChild) {\r\n                    this.location.removeChild(this.location.firstChild);\r\n                }\r\n                this.location.appendChild(view);\r\n            });\r\n        });\r\n    }\r\n    static htmlToDom(html) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            let element = document.createElement('div');\r\n            element.innerHTML = html;\r\n            return element;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/renderer/Renderer.js?");

/***/ }),

/***/ "./client/src/index.ts":
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/Renderer.js */ \"./client/src/renderer/Renderer.js\");\n/* harmony import */ var _models_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Game */ \"./client/src/models/Game.ts\");\n/* harmony import */ var _models_Arcade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Arcade */ \"./client/src/models/Arcade.ts\");\n\r\n\r\n\r\nconst game = new _models_Game__WEBPACK_IMPORTED_MODULE_1__.Game();\r\nconst renderLoc = document.getElementById(\"render\");\r\nconst menuRenderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.menu.view, renderLoc);\r\nmenuRenderer.render().then(function () {\r\n    document.getElementById('username').innerText = game.clientPlayer.username;\r\n    document.getElementById('createGame').addEventListener('click', function () {\r\n        game.createRoom();\r\n        setTimeout(function () {\r\n            let arcadeRenderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.arcade.view, renderLoc);\r\n            arcadeRenderer.render().then(function () {\r\n                document.getElementById('roomNumber').innerText = game.arcade.roomNumber.toString();\r\n            });\r\n        }, 1000);\r\n    });\r\n    document.getElementById('joinGame').addEventListener('click', function () {\r\n        let number = document.getElementById('roomCodeInput').value;\r\n        game.joinRoom(number);\r\n        setTimeout(function () {\r\n            let arcadeRenderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.arcade.view, renderLoc);\r\n            arcadeRenderer.render().then(function () {\r\n                document.getElementById('roomNumber').innerText = game.arcade.roomNumber.toString();\r\n            });\r\n        }, 1000);\r\n    });\r\n});\r\ngame.clientPlayer.socket.on('getRoomNumber', (roomNumber) => {\r\n    game.arcade = new _models_Arcade__WEBPACK_IMPORTED_MODULE_2__.Arcade(roomNumber);\r\n    console.log(roomNumber);\r\n});\r\n\n\n//# sourceURL=webpack://server/./client/src/index.ts?");

/***/ }),

/***/ "./client/src/models/Arcade.ts":
/*!*************************************!*\
  !*** ./client/src/models/Arcade.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Arcade\": () => /* binding */ Arcade\n/* harmony export */ });\nclass Arcade {\r\n    constructor(roomNumber) {\r\n        this._view = 'arcade.html';\r\n        this._roomNumber = roomNumber;\r\n    }\r\n    get view() {\r\n        return this._view;\r\n    }\r\n    get roomNumber() {\r\n        return this._roomNumber;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Arcade.ts?");

/***/ }),

/***/ "./client/src/models/Game.ts":
/*!***********************************!*\
  !*** ./client/src/models/Game.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./client/src/models/Menu.ts\");\n/* harmony import */ var _Arcade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arcade */ \"./client/src/models/Arcade.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./client/src/models/Player.ts\");\n\r\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this._menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__.Menu();\r\n        this._clientPlayer = new _Player__WEBPACK_IMPORTED_MODULE_2__.Player(Game.randomUsername());\r\n    }\r\n    get menu() {\r\n        return this._menu;\r\n    }\r\n    get arcade() {\r\n        return this._arcade;\r\n    }\r\n    set arcade(arcade) {\r\n        this._arcade = arcade;\r\n    }\r\n    get clientPlayer() {\r\n        return this._clientPlayer;\r\n    }\r\n    createRoom() {\r\n        this._clientPlayer.socket.emit('createRoom');\r\n    }\r\n    joinRoom(roomNumber) {\r\n        this._clientPlayer.socket.emit('joinRoom', roomNumber);\r\n        this._arcade = new _Arcade__WEBPACK_IMPORTED_MODULE_1__.Arcade(roomNumber.toString());\r\n    }\r\n    static randomUsername() {\r\n        const a = [\"Small\", \"Big\", \"Super\", \"Evil\", \"Unamused\", \"Fat\", \"Depressed\", \"Smart\", \"The\"];\r\n        const b = [\"Hecking\", \"Yellow\", \"Black\", \"White\", \"Woke\", \"Daddy\"];\r\n        const c = [\"Helicopter\", \"Doggo\", \"Banana\", \"Floofer\", \"Snowflake\", \"Boomer\", \"Pikachu\", \"Homie\", \"Gnome\", \"Rapper\", \"Sausage\"];\r\n        const rA = Math.floor(Math.random() * a.length);\r\n        const rB = Math.floor(Math.random() * b.length);\r\n        const rC = Math.floor(Math.random() * c.length);\r\n        let username = a[rA] + \" \" + b[rB] + \" \" + c[rC];\r\n        return username.toString();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Game.ts?");

/***/ }),

/***/ "./client/src/models/Menu.ts":
/*!***********************************!*\
  !*** ./client/src/models/Menu.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Menu\": () => /* binding */ Menu\n/* harmony export */ });\nclass Menu {\r\n    constructor() {\r\n        this._view = 'menu.html';\r\n    }\r\n    get view() {\r\n        return this._view;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Menu.ts?");

/***/ }),

/***/ "./client/src/models/Player.ts":
/*!*************************************!*\
  !*** ./client/src/models/Player.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => /* binding */ Player\n/* harmony export */ });\nclass Player {\r\n    constructor(username) {\r\n        // @ts-ignore\r\n        this._socket = io.connect();\r\n        this._username = username;\r\n    }\r\n    get socket() {\r\n        return this._socket;\r\n    }\r\n    set username(username) {\r\n        this._username = username;\r\n    }\r\n    get username() {\r\n        return this._username;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Player.ts?");

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