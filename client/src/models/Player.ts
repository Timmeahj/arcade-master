const io = require('socket.io');

export class Player{
    private _socket = io.connect();
    private _username: string;

    constructor(_username: string) {
        this._username = _username;
        console.log(this._socket);
    }

    set username(username: string) {
        this._username = username;
    }
}