export function setupUI(onStartGame) {
  document.getElementById("restart-btn").addEventListener("click", () => {
    onStartGame();
  });

  document.getElementById("next-level-btn").addEventListener("click", () => {
    hideModal();
    onStartGame();
  });

  initCustomSelect(() => {
    onStartGame();
  });
}

export function showModal(seconds) {
  document.getElementById("final-time").textContent = seconds;
  document.getElementById("win-modal").classList.remove("modal--hidden");
}

function hideModal() {
  document.getElementById("win-modal").classList.add("modal--hidden");
}

function initCustomSelect(onChange) {
  const select = document.getElementById("difficulty-select");
  const selected = select.querySelector(".difficulty__selected");
  const options = select.querySelectorAll(".difficulty__option");

  selected.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      const newValue = option.dataset.value;
      const currentValue = selected.dataset.value;

      if (newValue === currentValue) {
        select.classList.remove("open");
        return;
      }

      selected.textContent = option.textContent;
      selected.dataset.value = newValue;
      select.classList.remove("open");

      if (typeof onChange === "function") {
        onChange(newValue);
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
}
