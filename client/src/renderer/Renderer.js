var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Renderer {
    constructor(fileName, location) {
        this.fileName = fileName;
        this.location = location;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            return fetch('view/' + this.fileName)
                .then((response) => {
                return response.text();
            })
                .then(Renderer.htmlToDom)
                .then((view) => {
                while (this.location.firstChild) {
                    this.location.removeChild(this.location.firstChild);
                }
                this.location.appendChild(view);
            });
        });
    }
    static htmlToDom(html) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = document.createElement('div');
            element.innerHTML = html;
            return element;
        });
    }
}
