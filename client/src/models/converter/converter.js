import { Player } from "../Player";
export class Converter {
    constructor() {
    }
    JSONtoObject(json) {
        return new Player(json.username, false, json.x, json.y, json.id);
    }
    ObjectToJSON(player) {
        const { username, x, y, id } = player;
        return { username, x, y, id };
    }
}
