export class Renderer {
    fileName: string;
    location: HTMLElement;

    constructor(fileName: string, location: HTMLElement) {
        this.fileName = fileName;
        this.location = location;
    }


    public async render(): Promise<void>{
        return fetch('view/'+this.fileName)
        .then((response) => {
            return response.text();
        })
        .then(Renderer.htmlToDom)
        .then((view) => {
            this.location.appendChild(view);
        });
    }

    private static async htmlToDom(html: string): Promise<HTMLDivElement>{
        let element = document.createElement('div');
        element.innerHTML = html;
        return element;
    }
}