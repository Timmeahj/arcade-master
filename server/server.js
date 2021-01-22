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
// UUID
for (let i = 1000; i <= 9999; i++){
    rooms.push(i.toString());
}
shuffle(rooms);


io.on('connection', (sock) => {
    sock.on('doThing', (parameter) => {
        io.emit('giveBackToAll', parameter);
        sock.emit('giveBackToSock', parameter);
    });

    sock.on('createRoom', () => {
        let roomNumber = rooms.shift();
        takenRooms.push(roomNumber);
        sock.join(roomNumber);
        sock.emit('getRoomNumber', roomNumber);
        console.log('room created: '+roomNumber);
    });

    sock.on('joinRoom', (roomNumber) => {
        if(rooms.includes(roomNumber)){
            sock.emit('invalidRoomNumber');
        } else{
            sock.join(roomNumber);
            sock.emit('getRoomNumber', roomNumber);
            console.log('room joined: '+roomNumber);
        }
    });

    //TODO refactor
    sock.on('disconnect', () =>{
        console.log(takenRooms);
        if(takenRooms.length > 0){
            console.log(io.sockets.adapter.rooms[takenRooms[0]]);
            for (let i = 0; i < takenRooms.length; i++){
                if(!io.sockets.adapter.rooms[takenRooms[i]]){
                    rooms.push(takenRooms[i]);
                    console.log('room empty and destroyed: '+takenRooms[i]);
                }
            }
        }
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


