import {Player} from "./Player";

export class Arcade{
    private readonly _view: string;
    private readonly _roomNumber: string;
    private _allPlayers: Map<number, Player> = new Map<number, Player>();
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

    get allPlayers(): Map<number, Player>{
        return this._allPlayers;
    }

    getPlayer(id: number): Player{
        if(!this._allPlayers.has(id)){
            throw new Error("Player not found and can't be removed")
        }
        return (<Player>this._allPlayers.get(id));
    }

    addPlayer(player: Player){
        this._allPlayers.set(player.id, player);
    }

    removePlayer(id: number){
        if(!this._allPlayers.has(id)){
            throw new Error("Player not found and can't be removed")
        }
        (<Player>this._allPlayers.get(id)).leave();
        this._allPlayers.delete(id);
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

    centerForClient(player: Player){
        (<HTMLDivElement>document.getElementById('arcade')).style.marginLeft = (window.innerWidth/2)-(player.w/2)+"px";
        (<HTMLDivElement>document.getElementById('arcade')).style.marginTop = (window.innerHeight/2)-(player.h/2)+"px";
    }

    findIndexById(id: number, ar: Array<Player>): number{
        let index = -1;
        for(let i = 0; i < ar.length; i++){
            if(ar[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
}