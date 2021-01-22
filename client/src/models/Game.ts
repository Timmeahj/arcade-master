import {Menu} from "./Menu";
import {Arcade} from "./Arcade";
import {Player} from "./Player";

export class Game{

    private readonly _menu: Menu;
    private _arcade: Arcade | undefined;
    private readonly _clientPlayer: Player;

    constructor() {
       this._menu = new Menu();
       this._clientPlayer = new Player(Game.randomUsername());
    }

    get menu(): Menu{
        return this._menu;
    }

    get arcade(): Arcade{
        return <Arcade>this._arcade;
    }

    set arcade(arcade: Arcade){
        this._arcade = arcade;
    }

    get clientPlayer(): Player{
        return this._clientPlayer;
    }

    public createRoom(): void{
        this._clientPlayer.socket.emit('createRoom');
    }

    public joinRoom(roomNumber: string): void{
        this._clientPlayer.socket.emit('joinRoom', roomNumber);
        this._arcade = new Arcade(roomNumber.toString());
    }

    private static randomUsername(){
        const a = ["Small", "Big", "Super", "Evil", "Unamused", "Fat", "Depressed", "Smart", "The"];
        const b = ["Hecking", "Yellow", "Black", "White", "Woke", "Daddy"];
        const c = ["Helicopter", "Doggo", "Banana", "Floofer", "Snowflake", "Boomer", "Pikachu", "Homie", "Gnome", "Rapper", "Sausage"];

        const rA = Math.floor(Math.random()*a.length);
        const rB = Math.floor(Math.random()*b.length);
        const rC = Math.floor(Math.random()*c.length);
        let username = a[rA] +" "+ b[rB] +" "+ c[rC];
        return username.toString();
    }
}