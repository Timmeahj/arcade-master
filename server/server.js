const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));


const server = http.createServer(app);
const port = process.env.PORT || 8080;

const io = socketIO(server);

let rooms = [];
let takenRooms = [];
// TODO UUID
for (let i = 1000; i <= 9999; i++){
    rooms.push({'roomNumber': i.toString(), 'connected': []});
}
shuffle(rooms);

let playerSpeed = 5;


io.on('connection', (sock) => {
    sock.on('createRoom', (player) => {
        let takenRoom = rooms.shift();
        takenRooms.push(takenRoom);
        takenRoom.connected.push(player);
        sock.join(takenRoom.roomNumber);
        sock.emit('getRoomNumber', takenRoom.roomNumber);
        console.log('room created: '+takenRoom.roomNumber);
    });

    sock.on('joinRoom', (data) => {
        if(rooms.includes(data.roomNumber)){
            sock.emit('invalidRoomNumber');
        } else{
            sock.join(data.roomNumber);
            sock.emit('getRoomNumber', data.roomNumber);
            if(takenRooms.length > 0){
                for (let i = 0; i < takenRooms.length; i++){
                    if(takenRooms[i].roomNumber === data.roomNumber){
                        takenRooms[i].connected.push(data.player);
                    }
                }
            }
            console.log('room joined: '+data.roomNumber);
        }
    });

    sock.on('joined', (data) => {
        for (let i = 0; i < takenRooms.length; i++){
            if(takenRooms[i].roomNumber === data.roomNumber){
                sock.emit("updatePlayers", (takenRooms[i].connected));
            }
        }
    });

    //TODO refactor
    sock.on('disconnect', () =>{
        io.emit("userLeft", (sock.id));
        if(takenRooms.length > 0){
            for (let i = 0; i < takenRooms.length; i++){
                if(!io.sockets.adapter.rooms[takenRooms[i].roomNumber]){
                    rooms.push(takenRooms[i]);
                    console.log('room empty and destroyed: '+takenRooms[i]);
                }
            }
        }
    });

    sock.on('menuRendered', () =>{
       sock.emit('addMenuListeners');
    });

    sock.on('arcadeRendered', (data) =>{
        io.to(data.roomNumber).emit("spawnPlayer", (data.player));
        sock.emit('startRender');
    });

    sock.on('move', (data) =>{
        let playerX = data.x;
        let playerY = data.y;
        if(data.map){
            if(data.map[37]){
                playerX -= playerSpeed;
            }
            if(data.map[40]){
                playerY += playerSpeed;
            }
            if(data.map[39]){
                playerX += playerSpeed;
            }
            if(data.map[38]){
                playerY -= playerSpeed;
            }
        }
        io.to(data.roomNumber).emit("updateLocation", ({x: playerX, y: playerY, id: data.id}));
    });
});



server.on('error', (err) => {
    console.log("error: "+err)
});

server.listen(port, () =>{
    console.log("server running on "+port);
});

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
