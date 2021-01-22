export class Arcade{
    private readonly _view: string;
    private readonly _roomNumber: string;

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
}