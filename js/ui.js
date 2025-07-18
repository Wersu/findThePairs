export function setupUI(onStartGame) {
  document.getElementById("restart-btn").addEventListener("click", () => {
    onStartGame();
  });

  document.getElementById("next-level-btn").addEventListener("click", () => {
    hideModal();
    onStartGame();
  });

  document.getElementById("difficulty").addEventListener("change", () => {
    onStartGame();
  });
}

export function showModal(seconds) {
  document.getElementById("final-time").textContent = seconds;
  document.getElementById("win-modal").classList.remove("hidden");
}

function hideModal() {
  document.getElementById("win-modal").classList.add("hidden");
}