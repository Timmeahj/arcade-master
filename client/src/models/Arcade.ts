import {Player} from "./Player";

export class Arcade{
    private readonly _view: string;
    private readonly _roomNumber: string;
    private _allPlayers: Array<Player> = [];
    private _x: number = 0;
    private _y: number = 0;

    constructor(roomNumber: string) {
        this._view = 'arcade.html';
        this._roomNumber = roomNumber;
    }

    get view(): string{
        return this._view;
    }

    get roomNumber(): string{
        return this._roomNumber;
    }

    get allPlayers(): Array<Player>{
        return this._allPlayers;
    }

    addPlayer(player: Player){
        this._allPlayers.push(player);
    }

    removePlayer(player: Player){
        this._allPlayers = this._allPlayers.filter(e => e !== player);
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

    moveView(){
        (<HTMLDivElement>document.getElementById('arcade')).style.left = this._x+"px";
        (<HTMLDivElement>document.getElementById('arcade')).style.top = this._y+"px";
    }
}