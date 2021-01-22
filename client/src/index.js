import { Renderer } from './renderer/Renderer.js';
import { Game } from "./models/Game";
const game = new Game();
const renderer = new Renderer(game.menu.view, document.body);
renderer.render().then();
document.getElementById('username').innerText = game.clientPlayer.username;
