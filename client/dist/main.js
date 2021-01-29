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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer/Renderer.js */ \"./client/src/renderer/Renderer.js\");\n/* harmony import */ var _models_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Game */ \"./client/src/models/Game.ts\");\n/* harmony import */ var _models_Arcade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Arcade */ \"./client/src/models/Arcade.ts\");\n/* harmony import */ var _models_converter_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/converter/converter */ \"./client/src/models/converter/converter.ts\");\n\r\n\r\n\r\n\r\nconst game = new _models_Game__WEBPACK_IMPORTED_MODULE_1__.Game();\r\nconst renderLoc = document.getElementById(\"render\");\r\nconst menuRenderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.menu.view, renderLoc);\r\nconst sock = game.clientPlayer.socket;\r\nconst converter = new _models_converter_converter__WEBPACK_IMPORTED_MODULE_3__.Converter();\r\nconst playerSpeed = 5;\r\nconst refreshRate = 50;\r\nwindow.addEventListener(\"keydown\", function (e) {\r\n    // space and arrow keys\r\n    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {\r\n        e.preventDefault();\r\n    }\r\n}, false);\r\nmenuRenderer.render().then(function () {\r\n    sock.emit('menuRendered');\r\n});\r\nsock.on('addMenuListeners', () => {\r\n    document.getElementById('username').innerText = game.clientPlayer.username;\r\n    document.getElementById('createGame').addEventListener('click', function () {\r\n        game.createRoom();\r\n    });\r\n    document.getElementById('joinGame').addEventListener('click', function () {\r\n        let number = document.getElementById('roomCodeInput').value;\r\n        game.joinRoom(number);\r\n    });\r\n});\r\nsock.on('getRoomNumber', (roomNumber) => {\r\n    game.arcade = new _models_Arcade__WEBPACK_IMPORTED_MODULE_2__.Arcade(roomNumber);\r\n    let arcadeRenderer = new _renderer_Renderer_js__WEBPACK_IMPORTED_MODULE_0__.Renderer(game.arcade.view, renderLoc);\r\n    arcadeRenderer.render().then(function () {\r\n        sock.emit('arcadeRendered', ({ player: converter.ObjectToJSON(game.clientPlayer), roomNumber: game.arcade.roomNumber }));\r\n        sock.emit('joined', ({ player: converter.ObjectToJSON(game.clientPlayer), roomNumber: game.arcade.roomNumber }));\r\n    });\r\n});\r\nsock.on('spawnPlayer', (JSONPlayer) => {\r\n    let player = converter.JSONtoObject(JSONPlayer);\r\n    game.arcade.addPlayer(player);\r\n    document.getElementById('roomNumber').innerText = game.arcade.roomNumber;\r\n    player.spawnPlayer(document.getElementById('arcade'));\r\n    enableMovement();\r\n});\r\nsock.on('startRender', () => {\r\n    renderAll();\r\n});\r\nsock.on('userLeft', (socketId) => {\r\n    game.arcade.allPlayers.forEach(player => {\r\n        if (player.socket.id === socketId) {\r\n            game.arcade.removePlayer(player.id);\r\n        }\r\n    });\r\n});\r\nsock.on('updatePlayers', (connected) => {\r\n    let allPlayers = game.arcade.allPlayers;\r\n    connected.forEach((playerConnected) => {\r\n        if (!game.arcade.allPlayers.has(playerConnected.id)) {\r\n            let newPlayer = converter.JSONtoObject(playerConnected);\r\n            console.log(newPlayer);\r\n            game.arcade.addPlayer(newPlayer);\r\n            newPlayer.spawnPlayer(document.getElementById('arcade'));\r\n        }\r\n    });\r\n});\r\nfunction renderAll() {\r\n    game.arcade.moveView();\r\n    game.arcade.centerForClient(game.clientPlayer);\r\n    game.arcade.allPlayers.forEach(player => player.renderPlayer());\r\n    setTimeout(function () {\r\n        renderAll();\r\n    }, refreshRate);\r\n}\r\nfunction enableMovement() {\r\n    let map = {\r\n        37: false,\r\n        38: false,\r\n        39: false,\r\n        40: false\r\n    };\r\n    let clientPlayer = game.arcade.getPlayer(game.clientPlayer.id);\r\n    function sendMap() {\r\n        sock.emit('move', ({ x: clientPlayer.x, y: clientPlayer.y, roomNumber: game.arcade.roomNumber, map: map, id: clientPlayer.id }));\r\n        setTimeout(sendMap, refreshRate);\r\n    }\r\n    sendMap();\r\n    onkeydown = function (e) {\r\n        //e = e || event; // to deal with IE\r\n        if (e.keyCode === 37) {\r\n            map[37] = true;\r\n        }\r\n        if (e.keyCode === 38) {\r\n            map[38] = true;\r\n        }\r\n        if (e.keyCode === 39) {\r\n            map[39] = true;\r\n        }\r\n        if (e.keyCode === 40) {\r\n            map[40] = true;\r\n        }\r\n    };\r\n    onkeyup = function (e) {\r\n        //e = e || event; // to deal with IE\r\n        if (e.keyCode === 37) {\r\n            map[37] = false;\r\n        }\r\n        if (e.keyCode === 38) {\r\n            map[38] = false;\r\n        }\r\n        if (e.keyCode === 39) {\r\n            map[39] = false;\r\n        }\r\n        if (e.keyCode === 40) {\r\n            map[40] = false;\r\n        }\r\n    };\r\n}\r\nsock.on('updateLocation', (data) => {\r\n    let player = game.arcade.getPlayer(data.id);\r\n    player.x = data.x;\r\n    player.y = data.y;\r\n    if (data.id === game.clientPlayer.id) {\r\n        game.arcade.x = -player.x;\r\n        game.arcade.y = -player.y;\r\n    }\r\n});\r\nfunction findIndexById(id, ar) {\r\n    let index = -1;\r\n    for (let i = 0; i < ar.length; i++) {\r\n        if (ar[i].id === id) {\r\n            index = i;\r\n            break;\r\n        }\r\n    }\r\n    return index;\r\n}\r\nsock.on('invalidRoomNumber', () => {\r\n    //TODO refactor\r\n    window.alert('Invalid room number');\r\n});\r\n\n\n//# sourceURL=webpack://server/./client/src/index.ts?");

/***/ }),

/***/ "./client/src/models/Arcade.ts":
/*!*************************************!*\
  !*** ./client/src/models/Arcade.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Arcade\": () => /* binding */ Arcade\n/* harmony export */ });\nclass Arcade {\r\n    constructor(roomNumber) {\r\n        this._allPlayers = new Map();\r\n        this._x = 0;\r\n        this._y = 0;\r\n        this._view = 'arcade.html';\r\n        this._roomNumber = roomNumber;\r\n    }\r\n    get view() {\r\n        return this._view;\r\n    }\r\n    get roomNumber() {\r\n        return this._roomNumber;\r\n    }\r\n    get allPlayers() {\r\n        return this._allPlayers;\r\n    }\r\n    getPlayer(id) {\r\n        if (!this._allPlayers.has(id)) {\r\n            throw new Error(\"Player not found and can't be removed\");\r\n        }\r\n        return this._allPlayers.get(id);\r\n    }\r\n    addPlayer(player) {\r\n        this._allPlayers.set(player.id, player);\r\n    }\r\n    removePlayer(id) {\r\n        if (!this._allPlayers.has(id)) {\r\n            throw new Error(\"Player not found and can't be removed\");\r\n        }\r\n        this._allPlayers.get(id).leave();\r\n        this._allPlayers.delete(id);\r\n    }\r\n    set x(x) {\r\n        this._x = x;\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    set y(y) {\r\n        this._y = y;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    moveView() {\r\n        document.getElementById('arcade').style.left = this._x + \"px\";\r\n        document.getElementById('arcade').style.top = this._y + \"px\";\r\n    }\r\n    centerForClient(player) {\r\n        document.getElementById('arcade').style.marginLeft = (window.innerWidth / 2) - (player.w / 2) + \"px\";\r\n        document.getElementById('arcade').style.marginTop = (window.innerHeight / 2) - (player.h / 2) + \"px\";\r\n    }\r\n    findIndexById(id, ar) {\r\n        let index = -1;\r\n        for (let i = 0; i < ar.length; i++) {\r\n            if (ar[i].id === id) {\r\n                index = i;\r\n                break;\r\n            }\r\n        }\r\n        return index;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Arcade.ts?");

/***/ }),

/***/ "./client/src/models/Game.ts":
/*!***********************************!*\
  !*** ./client/src/models/Game.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => /* binding */ Game\n/* harmony export */ });\n/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ \"./client/src/models/Menu.ts\");\n/* harmony import */ var _Arcade__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arcade */ \"./client/src/models/Arcade.ts\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ \"./client/src/models/Player.ts\");\n/* harmony import */ var _converter_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./converter/converter */ \"./client/src/models/converter/converter.ts\");\n\r\n\r\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this._converter = new _converter_converter__WEBPACK_IMPORTED_MODULE_3__.Converter();\r\n        this._menu = new _Menu__WEBPACK_IMPORTED_MODULE_0__.Menu();\r\n        this._clientPlayer = new _Player__WEBPACK_IMPORTED_MODULE_2__.Player(Game.randomUsername(), true, 0, 0, Date.now());\r\n    }\r\n    get menu() {\r\n        return this._menu;\r\n    }\r\n    get arcade() {\r\n        return this._arcade;\r\n    }\r\n    set arcade(arcade) {\r\n        this._arcade = arcade;\r\n    }\r\n    get clientPlayer() {\r\n        return this._clientPlayer;\r\n    }\r\n    createRoom() {\r\n        this._clientPlayer.socket.emit('createRoom', (this._converter.ObjectToJSON(this._clientPlayer)));\r\n    }\r\n    joinRoom(roomNumber) {\r\n        this._clientPlayer.socket.emit('joinRoom', { player: this._converter.ObjectToJSON(this._clientPlayer), roomNumber: roomNumber });\r\n        this._arcade = new _Arcade__WEBPACK_IMPORTED_MODULE_1__.Arcade(roomNumber.toString());\r\n    }\r\n    static randomUsername() {\r\n        const a = [\"Small\", \"Big\", \"Super\", \"Evil\", \"Unamused\", \"Fat\", \"Depressed\", \"Smart\", \"The\"];\r\n        const b = [\"Hecking\", \"Yellow\", \"Black\", \"White\", \"Woke\", \"Daddy\"];\r\n        const c = [\"Helicopter\", \"Doggo\", \"Banana\", \"Floofer\", \"Snowflake\", \"Boomer\", \"Pikachu\", \"Homie\", \"Gnome\", \"Rapper\", \"Sausage\"];\r\n        const rA = Math.floor(Math.random() * a.length);\r\n        const rB = Math.floor(Math.random() * b.length);\r\n        const rC = Math.floor(Math.random() * c.length);\r\n        let username = a[rA] + \" \" + b[rB] + \" \" + c[rC];\r\n        return username.toString();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Game.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => /* binding */ Player\n/* harmony export */ });\nclass Player {\r\n    constructor(username, clientPlayer, x, y, id) {\r\n        // @ts-ignore\r\n        this._socket = io.connect();\r\n        this._w = 50;\r\n        this._h = 50;\r\n        this._username = username;\r\n        this._character = document.createElement('div');\r\n        this._character.style.width = this._w + \"px\";\r\n        this._character.style.height = this._h + \"px\";\r\n        if (clientPlayer) {\r\n            this._x = 200; //(window.innerWidth/2)-(this._w/2)\r\n            this._y = 200; //(window.innerHeight/2)-(this._h/2)\r\n        }\r\n        else {\r\n            this._x = x;\r\n            this._y = y;\r\n        }\r\n        this._character.style.position = \"absolute\";\r\n        this._character.style.background = 'red';\r\n        this._id = id;\r\n    }\r\n    spawnPlayer(location) {\r\n        location.appendChild(this._character);\r\n    }\r\n    leave() {\r\n        this._character.remove();\r\n    }\r\n    renderPlayer() {\r\n        this._character.style.left = this._x + \"px\";\r\n        this._character.style.top = this._y + \"px\";\r\n    }\r\n    get id() {\r\n        return this._id;\r\n    }\r\n    set id(id) {\r\n        this._id = id;\r\n    }\r\n    get socket() {\r\n        return this._socket;\r\n    }\r\n    set username(username) {\r\n        this._username = username;\r\n    }\r\n    get username() {\r\n        return this._username;\r\n    }\r\n    set x(x) {\r\n        this._x = x;\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    set y(y) {\r\n        this._y = y;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    set w(w) {\r\n        this._w = w;\r\n    }\r\n    get w() {\r\n        return this._w;\r\n    }\r\n    set h(h) {\r\n        this._h = h;\r\n    }\r\n    get h() {\r\n        return this._h;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/Player.ts?");

/***/ }),

/***/ "./client/src/models/converter/converter.ts":
/*!**************************************************!*\
  !*** ./client/src/models/converter/converter.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Converter\": () => /* binding */ Converter\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Player */ \"./client/src/models/Player.ts\");\n\r\nclass Converter {\r\n    constructor() {\r\n    }\r\n    JSONtoObject(json) {\r\n        return new _Player__WEBPACK_IMPORTED_MODULE_0__.Player(json.username, false, json.x, json.y, json.id);\r\n    }\r\n    ObjectToJSON(player) {\r\n        const { username, x, y, id } = player;\r\n        return { username, x, y, id };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://server/./client/src/models/converter/converter.ts?");

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