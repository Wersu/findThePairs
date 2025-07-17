import { initGame } from './game.js';
import { setupUI } from './ui.js';

window.addEventListener("DOMContentLoaded", () => {
  setupUI();
  initGame();
});