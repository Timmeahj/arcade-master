export class Player{
    // @ts-ignore
    private _socket = io.connect();
    private _username: string;
    private _x: number;
    private _y: number;
    private _w: number = 50;
    private _h: number = 50;
    private _id: number;
    private readonly _character: HTMLDivElement;

    constructor(username: string, clientPlayer: boolean, x: number, y: number, id: number) {
        this._username = username;
        this._character = document.createElement('div');
        this._character.style.width = this._w+"px";
        this._character.style.height = this._h+"px";
        if(clientPlayer){
            this._x = 200;//(window.innerWidth/2)-(this._w/2)
            this._y = 200;//(window.innerHeight/2)-(this._h/2)
        } else{
            this._x = x;
            this._y = y;
        }
        this._character.style.position = "absolute";
        this._character.style.background = 'red';
        this._id = id;
    }

    spawnPlayer(location: HTMLElement){
        location.appendChild(this._character);
    }

    leave(){
        this._character.remove();
    }

    renderPlayer(){
        this._character.style.left = this._x+"px";
        this._character.style.top = this._y+"px";
    }

    get id(){
        return this._id;
    }

    set id(id: number) {
        this._id = id;
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

    set x(x: number){
        this._x = x;
    }

    get x(){
        return this._x;
    }

    set y(y: number){
        this._y = y;
    }

    get y(){
        return this._y;
    }

    set w(w: number){
        this._w = w;
    }

    get w(){
        return this._w;
    }

    set h(h: number){
        this._h = h;
    }

    get h(){
        return this._h;
    }
}

