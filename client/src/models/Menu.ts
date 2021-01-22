export class Menu{
    private readonly _view: string;

    constructor() {
        this._view = 'menu.html';
    }

    get view(): string{
        return this._view;
    }
}