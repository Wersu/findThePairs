import { initGame, updateLayout } from './game.js';
import { setupUI } from './ui.js';


window.addEventListener("DOMContentLoaded", () => {
  setupUI(startGame);
  startGame();
});

window.addEventListener("resize", () => {
  updateLayout();
});

function startGame() {
  initGame();
}

