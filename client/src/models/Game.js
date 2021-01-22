import { Menu } from "./Menu";
import { Arcade } from "./Arcade";
import { Player } from "./Player";
export class Game {
    constructor() {
        this._menu = new Menu();
        this._arcade = new Arcade();
        this._clientPlayer = new Player(Game.randomUsername());
    }
    get menu() {
        return this._menu;
    }
    get arcade() {
        return this._arcade;
    }
    get clientPlayer() {
        return this._clientPlayer;
    }
    static randomUsername() {
        const a = ["Small", "Big", "Super", "Evil", "Unamused", "Fat", "Depressed", "Smart", "The"];
        const b = ["Hecking", "Yellow", "Black", "White", "Woke", "Daddy"];
        const c = ["Helicopter", "Doggo", "Banana", "Floofer", "Snowflake", "Boomer", "Pikachu", "Homie", "Gnome", "Rapper", "Sausage"];
        const rA = Math.floor(Math.random() * a.length);
        const rB = Math.floor(Math.random() * b.length);
        const rC = Math.floor(Math.random() * c.length);
        let username = a[rA] + " " + b[rB] + " " + c[rC];
        return username.toString();
    }
}
