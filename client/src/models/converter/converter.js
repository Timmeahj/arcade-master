import { Player } from "../Player";
export class Converter {
    constructor() {
    }
    JSONtoObject(json) {
        const player = JSON.parse(json);
        return new Player(player.username, false, player.x, player.y, player.id);
    }
    ObjectToJSON(player) {
        const { username, x, y, id } = player;
        return JSON.stringify({ username, x, y, id });
    }
}
