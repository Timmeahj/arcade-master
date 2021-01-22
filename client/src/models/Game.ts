import {Menu} from "./Menu";
import {Arcade} from "./Arcade";
import {Player} from "./Player";

export class Game{

    private readonly _menu: Menu;
    private readonly _arcade: Arcade;
    private readonly _clientPlayer: Player;

    constructor() {
       this._menu = new Menu();
       this._arcade = new Arcade();
       this._clientPlayer = new Player(Game.randomUsername());
       window.alert(this._clientPlayer);
    }

    get menu(): Menu{
        return this._menu;
    }

    get arcade(): Arcade{
        return this._arcade;
    }

    get clientPlayer(): Player{
        return this._clientPlayer;
    }

    private static randomUsername(){
        const a = ["Small", "Big", "Super", "Evil", "Unamused", "Fat", "Depressed", "Smart", "The"];
        const b = ["Hecking", "Yellow", "Black", "White", "Woke", "Daddy"];
        const c = ["Helicopter", "Doggo", "Banana", "Floofer", "Snowflake", "Boomer", "Pikachu", "Homie", "Gnome", "Rapper", "Sausage"];

        const rA = Math.floor(Math.random()*a.length);
        const rB = Math.floor(Math.random()*b.length);
        const rC = Math.floor(Math.random()*c.length);
        return a[rA] +" "+ b[rB] +" "+ c[rC];
    }
}