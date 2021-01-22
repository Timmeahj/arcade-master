export class Player {
    constructor(username) {
        // @ts-ignore
        this._socket = io.connect();
        this._username = username;
    }
    get socket() {
        return this._socket;
    }
    set username(username) {
        this._username = username;
    }
    get username() {
        return this._username;
    }
}
