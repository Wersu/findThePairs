import { initGame } from './game.js';
import { setupUI } from './ui.js';

function getPairCountByDifficulty() {
  const difficulty = document.getElementById("difficulty").value;

  switch (difficulty) {
    case "easy":
      return 12;
    case "medium":
      return 18;
    case "hard":
      return 24;
    default:
      return 12;
  }
}

function startGame() {
  const pairs  = getPairCountByDifficulty();
  initGame(pairs);
}

window.addEventListener("DOMContentLoaded", () => {
  setupUI(startGame);
  startGame();
});