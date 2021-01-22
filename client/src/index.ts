import {Renderer} from './renderer/Renderer.js';
import {Game} from "./models/Game";
import {Arcade} from "./models/Arcade";

const game = new Game();
const renderLoc = <HTMLDivElement>document.getElementById("render");
const menuRenderer = new Renderer(game.menu.view , renderLoc);

menuRenderer.render().then(function (){
    (<HTMLDivElement>document.getElementById('username')).innerText = game.clientPlayer.username;
    (<HTMLButtonElement>document.getElementById('createGame')).addEventListener('click', function (){
        game.createRoom();
    });
    (<HTMLButtonElement>document.getElementById('joinGame')).addEventListener('click', function (){
        let number = (<HTMLInputElement>document.getElementById('roomCodeInput')).value;
        game.joinRoom(number);
    });
});

game.clientPlayer.socket.on('getRoomNumber', (roomNumber: string) => {
    game.arcade = new Arcade(roomNumber);
    let arcadeRenderer = new Renderer(game.arcade.view , renderLoc);
    arcadeRenderer.render().then(function (){
        (<HTMLDivElement>document.getElementById('roomNumber')).innerText = game.arcade.roomNumber.toString();
    });
    console.log(roomNumber);
});

game.clientPlayer.socket.on('invalidRoomNumber', () => {
    //TODO refactor
    window.alert('Invalid room number');
});




