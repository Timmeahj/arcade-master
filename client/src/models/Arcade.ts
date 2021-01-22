export class Arcade{
    private readonly _view: string;

    constructor() {
        this._view = 'arcade.html';
    }

    get view(): string{
        return this._view;
    }
}