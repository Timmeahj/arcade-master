export class Player {
    constructor(username, clientPlayer, x, y, id) {
        // @ts-ignore
        this._socket = io.connect();
        this._w = 50;
        this._h = 50;
        this._username = username;
        this._character = document.createElement('div');
        this._character.style.width = this._w + "px";
        this._character.style.height = this._h + "px";
        if (clientPlayer) {
            this._x = 0; //(window.innerWidth/2)-(this._w/2)
            this._y = 0; //(window.innerHeight/2)-(this._h/2)
        }
        else {
            this._x = x;
            this._y = y;
        }
        this._character.style.position = "absolute";
        this._character.style.background = 'red';
        this._id = id;
    }
    spawnPlayer(location) {
        location.appendChild(this._character);
    }
    leave() {
        this._character.remove();
    }
    renderPlayer() {
        this._character.style.left = this._x + "px";
        this._character.style.top = this._y + "px";
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
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
    set x(x) {
        this._x = x;
    }
    get x() {
        return this._x;
    }
    set y(y) {
        this._y = y;
    }
    get y() {
        return this._y;
    }
    set w(w) {
        this._w = w;
    }
    get w() {
        return this._w;
    }
    set h(h) {
        this._h = h;
    }
    get h() {
        return this._h;
    }
}
