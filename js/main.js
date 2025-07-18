import { initGame } from './game.js';
import { setupUI } from './ui.js';

function getPairCountByDifficulty() {
  const difficulty = document.getElementById("difficulty").value;

  switch (difficulty) {
    case "easy":
      return { pairs: 12, columns: 4 };
    case "medium":
      return { pairs: 18, columns: 6 };
    case "hard":
      return { pairs: 24, columns: 8 };
    default:
      return { pairs: 12, columns: 4 };
  }
}

function startGame() {
  const { pairs, columns } = getPairCountByDifficulty();
  initGame(pairs, columns);
}

window.addEventListener("DOMContentLoaded", () => {
  setupUI(startGame);
  startGame();
});