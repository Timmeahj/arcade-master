import {Player} from "../Player";

export class Converter {

    constructor() {

    }

    public JSONtoObject(json: string): Player{
        const player = JSON.parse(json);
        return new Player(player.username, false, player.x, player.y, player.id);
    }

    public ObjectToJSON(player: Player): string{
        const {username, x, y, id} = player;
        return JSON.stringify({username,x,y,id});
    }

}