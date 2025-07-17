import { initGame } from "./game.js";

export function setupUI() {
  document.getElementById("restart-btn").addEventListener("click", () => {
    initGame();
  });

  document.getElementById("next-level-btn").addEventListener("click", () => {
    // Пока просто перезапуск
    hideModal();
    initGame();
  });
}

export function showModal(seconds) {
  document.getElementById("final-time").textContent = seconds;
  document.getElementById("win-modal").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("win-modal").classList.add("hidden");
}