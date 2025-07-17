let seconds = 0;
let timerInterval = null;

export function startTimer(updateCallback) {
  clearInterval(timerInterval);
  seconds = 0;
  updateCallback(seconds);
  timerInterval = setInterval(() => {
    seconds++;
    updateCallback(seconds);
  }, 1000);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function getTime() {
  return seconds;
}