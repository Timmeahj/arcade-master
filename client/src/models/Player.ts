export class Player{
    // @ts-ignore
    private _socket = io.connect();
    private _username: string;

    constructor(username: string) {
        this._username = username;
    }

    get socket(){
        return this._socket;
    }

    set username(username: string) {
        this._username = username;
    }

    get username(){
        return this._username;
    }
}

