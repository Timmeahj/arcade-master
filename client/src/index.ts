import {Renderer} from './renderer/Renderer.js';
import {Game} from "./models/Game";
import {Arcade} from "./models/Arcade";
import {Player} from "./models/Player";
import {Converter} from "./models/converter/converter";

const game = new Game();
const renderLoc = <HTMLDivElement>document.getElementById("render");
const menuRenderer = new Renderer(game.menu.view , renderLoc);
const sock = game.clientPlayer.socket;
const converter = new Converter();

const playerSpeed = 5;

const refreshRate = 50;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

menuRenderer.render().then(function (){
    sock.emit('menuRendered');
});

sock.on('addMenuListeners', () => {
    (<HTMLDivElement>document.getElementById('username')).innerText = game.clientPlayer.username;
    (<HTMLButtonElement>document.getElementById('createGame')).addEventListener('click', function (){
        game.createRoom();
    });
    (<HTMLButtonElement>document.getElementById('joinGame')).addEventListener('click', function (){
        let number = (<HTMLInputElement>document.getElementById('roomCodeInput')).value;
        game.joinRoom(number);
    });
});

sock.on('getRoomNumber', (roomNumber: string) => {
    game.arcade = new Arcade(roomNumber);
    let arcadeRenderer = new Renderer(game.arcade.view , renderLoc);
    arcadeRenderer.render().then(function (){
        sock.emit('arcadeRendered', ({ player: converter.ObjectToJSON(game.clientPlayer), roomNumber: game.arcade.roomNumber }));
        sock.emit('joined', ({ player: converter.ObjectToJSON(game.clientPlayer), roomNumber: game.arcade.roomNumber }));
    });
});

sock.on('spawnPlayer', (JSONPlayer: { id: number ; username: string; x: number; y: number; }) => {
    let player = converter.JSONtoObject(JSONPlayer);
    game.arcade.addPlayer(player);
    (<HTMLDivElement>document.getElementById('roomNumber')).innerText = game.arcade.roomNumber;
    player.spawnPlayer((<HTMLDivElement>document.getElementById('arcade')));
    enableMovement();
});

sock.on('startRender', () => {
    renderAll();
});

sock.on('userLeft', (socketId: number) => {
    game.arcade.allPlayers.forEach(player =>{
        if(player.socket.id === socketId){
            game.arcade.removePlayer(player.id);
        }
    });
});

sock.on('updatePlayers', (connected: any) => {
    let allPlayers = game.arcade.allPlayers;
    connected.forEach((playerConnected: { id: number ; username: string; x: number; y: number; }) => {
        if(!game.arcade.allPlayers.has(playerConnected.id)){
            let newPlayer = converter.JSONtoObject(playerConnected);
            console.log(newPlayer);
            game.arcade.addPlayer(newPlayer);
            newPlayer.spawnPlayer((<HTMLDivElement>document.getElementById('arcade')));
        }
    });
});

function renderAll(){
    game.arcade.moveView();
    game.arcade.centerForClient(game.clientPlayer);
    game.arcade.allPlayers.forEach(player => player.renderPlayer());
    setTimeout(function (){
        renderAll();
    }, refreshRate);
}

function enableMovement(){
    let map = {
        37: false,
        38: false,
        39: false,
        40: false
    };
    let clientPlayer = game.arcade.getPlayer(game.clientPlayer.id);

    function sendMap() {
        sock.emit('move', ({ x: clientPlayer.x, y: clientPlayer.y, roomNumber: game.arcade.roomNumber, map: map, id: clientPlayer.id }));
        setTimeout(sendMap, refreshRate);
    }

    sendMap();

    onkeydown = function(e: KeyboardEvent){
        //e = e || event; // to deal with IE
        if(e.keyCode === 37){
            map[37] = true;
        }
        if(e.keyCode === 38){
            map[38] = true;
        }
        if(e.keyCode === 39){
            map[39] = true;
        }
        if(e.keyCode === 40){
            map[40] = true;
        }

    }

    onkeyup = function(e: KeyboardEvent){
        //e = e || event; // to deal with IE
        if(e.keyCode === 37){
            map[37] = false;
        }
        if(e.keyCode === 38){
            map[38] = false;
        }
        if(e.keyCode === 39){
            map[39] = false;
        }
        if(e.keyCode === 40){
            map[40] = false;
        }
    }
}

sock.on('updateLocation', (data: any) => {
    let player = game.arcade.getPlayer(data.id);
    player.x = data.x;
    player.y = data.y;
    if(data.id === game.clientPlayer.id){
        game.arcade.x = -player.x;
        game.arcade.y = -player.y;
    }
});

function findIndexById(id: number, ar: Array<Player>): number{
    let index = -1;
    for(let i = 0; i < ar.length; i++){
        if(ar[i].id === id) {
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










