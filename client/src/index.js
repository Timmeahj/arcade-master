import { Renderer } from './renderer/Renderer.js';
import { Game } from "./models/Game";
import { Arcade } from "./models/Arcade";
const game = new Game();
const renderLoc = document.getElementById("render");
const menuRenderer = new Renderer(game.menu.view, renderLoc);
menuRenderer.render().then(function () {
    document.getElementById('username').innerText = game.clientPlayer.username;
    document.getElementById('createGame').addEventListener('click', game.createRoom);
    document.getElementById('joinGame').addEventListener('click', function () {
        let number = document.getElementById('roomCodeInput').value;
        game.joinRoom(number);
    });
});
game.clientPlayer.socket.on('getRoomNumber', (roomNumber) => {
    game.arcade = new Arcade(roomNumber);
    let arcadeRenderer = new Renderer(game.arcade.view, renderLoc);
    arcadeRenderer.render().then(function () {
        document.getElementById('roomNumber').innerText = game.arcade.roomNumber.toString();
    });
    console.log(roomNumber);
});
