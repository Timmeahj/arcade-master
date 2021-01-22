//const io = require('socket.io');
export class Player {
    constructor(_username) {
        this._socket = io.connect();
        this._username = _username;
        console.log(this._socket);
    }
    set username(username) {
        this._username = username;
    }
}
