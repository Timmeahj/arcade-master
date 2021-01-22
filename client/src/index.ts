import {Renderer} from './renderer/Renderer.js';
import {Game} from "./models/Game";

const game = new Game();
const renderer = new Renderer(game.menu.view , document.body);
renderer.render().then(function (){
    document.getElementById('username')!.innerText = game.clientPlayer.username;
});

const sock = game.clientPlayer.socket;
console.log(sock, game.clientPlayer.username);

sock.on('serverSentThis', () => {
    sock.emit('sendBack');
});


