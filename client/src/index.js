import { Renderer } from './renderer/Renderer.js';
import { Game } from "./models/Game";
import { Arcade } from "./models/Arcade";
import { Converter } from "./models/converter/converter";
const game = new Game();
const renderLoc = document.getElementById("render");
const menuRenderer = new Renderer(game.menu.view, renderLoc);
const sock = game.clientPlayer.socket;
const converter = new Converter();
const playerSpeed = 5;
window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
menuRenderer.render().then(function () {
    sock.emit('menuRendered');
});
sock.on('addMenuListeners', () => {
    document.getElementById('username').innerText = game.clientPlayer.username;
    document.getElementById('createGame').addEventListener('click', function () {
        game.createRoom();
    });
    document.getElementById('joinGame').addEventListener('click', function () {
        let number = document.getElementById('roomCodeInput').value;
        game.joinRoom(number);
    });
});
sock.on('getRoomNumber', (roomNumber) => {
    game.arcade = new Arcade(roomNumber);
    let arcadeRenderer = new Renderer(game.arcade.view, renderLoc);
    arcadeRenderer.render().then(function () {
        sock.emit('arcadeRendered', ({ player: converter.ObjectToJSON(game.clientPlayer), roomNumber: game.arcade.roomNumber }));
    });
});
sock.on('spawnPlayer', (JSONPlayer) => {
    enableMovement();
    let player = converter.JSONtoObject(JSONPlayer);
    game.arcade.addPlayer(player);
    console.log(game.arcade.allPlayers);
    document.getElementById('roomNumber').innerText = game.arcade.roomNumber;
    player.spawnPlayer(document.getElementById('arcade'));
});
sock.on('startRender', () => {
    renderAll();
});
function renderAll() {
    game.arcade.moveView();
    game.arcade.allPlayers.forEach(player => player.renderPlayer());
    setTimeout(function () {
        renderAll();
    }, 100);
}
function enableMovement() {
    let map = new Map();
    onkeydown = onkeyup = function (e) {
        //e = e || event; // to deal with IE
        map.set(e.keyCode, e.type == 'keydown');
        let allPlayers = game.arcade.allPlayers;
        let clientPlayer = allPlayers[findIndexById(game.clientPlayer.id, allPlayers)];
        //left
        if (map.get(37)) {
            sock.emit('move', ({ x: game.clientPlayer.x, y: game.clientPlayer.y, arcadeX: game.arcade.x, arcadeY: game.arcade.y, roomNumber: game.arcade.roomNumber, direction: "left" }));
        }
        //down
        if (map.get(40)) {
            sock.emit('move', ({ x: game.clientPlayer.x, y: game.clientPlayer.y, arcadeX: game.arcade.x, arcadeY: game.arcade.y, roomNumber: game.arcade.roomNumber, direction: "down" }));
        }
        //right
        if (map.get(39)) {
            sock.emit('move', ({ x: game.clientPlayer.x, y: game.clientPlayer.y, arcadeX: game.arcade.x, arcadeY: game.arcade.y, roomNumber: game.arcade.roomNumber, direction: "right" }));
        }
        //up
        if (map.get(38)) {
            sock.emit('move', ({ x: game.clientPlayer.x, y: game.clientPlayer.y, arcadeX: game.arcade.x, arcadeY: game.arcade.y, roomNumber: game.arcade.roomNumber, direction: "up" }));
        }
    };
}
sock.on('updateLocation', (data) => {
    let allPlayers = game.arcade.allPlayers;
    let player = allPlayers[findIndexById(data.id, allPlayers)];
    player.x = data.x;
    player.y = data.y;
    if (data.id === game.clientPlayer.id) {
        game.arcade.x = data.arcadeX;
        game.arcade.y = data.arcadeY;
    }
});
function findIndexById(id, ar) {
    let index = -1;
    for (let i = 0; i < ar.length; i++) {
        if (ar[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}
sock.on('invalidRoomNumber', () => {
    //TODO refactor
    window.alert('Invalid room number');
});
