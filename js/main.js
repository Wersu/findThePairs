import { initGame, updateLayout } from './game.js';
import { setupUI } from './ui.js';

let pairs;

function getPairCountByDifficulty() {
  const difficulty = document.getElementById("difficulty").value;

  switch (difficulty) {
    case "easy":
      return 12;
    case "medium":
      return 16;
    case "hard":
      return 20;
    default:
      return 12;
  }
}

function startGame() {
  pairs  = getPairCountByDifficulty();
  initGame(pairs);
}

window.addEventListener("DOMContentLoaded", () => {
  setupUI(startGame);
  startGame();
});

window.addEventListener("resize", () => {
  updateLayout(pairs);
});