import {Player} from "../Player";

export class Converter {

    constructor() {

    }

    public JSONtoObject(json: { id: number; username: string; x: number; y: number }): Player{
        return new Player(json.username, false, json.x, json.y, json.id);
    }

    public ObjectToJSON(player: Player): { x: number; y: number; id: number; username: string }{
        const {username, x, y, id} = player;
        return {username,x,y,id};
    }

}