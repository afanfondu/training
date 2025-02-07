const start = document.querySelector("#start");
const stop = document.querySelector("#stop");
const cleanup = document.querySelector("#cleanup");
const status = document.querySelector("#status");
const arraySize = document.querySelector("#array-size");
const memoryUsage = document.querySelector("#memory-usage");

let leakyArray = [];
let intervalId = null;
function updateUI(statusMsg) {
  status.textContent = `Status: ${statusMsg}`;
  arraySize.textContent = leakyArray.length;

  const usedMB = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
  memoryUsage.textContent = `${usedMB} MB`;
}
updateUI("Stopped");

start.addEventListener("click", () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    leakyArray.push({
      data: new Array(100000).fill("X").join("") + Date.now(),
    });
    updateUI("Running");
  }, 1000);
});

stop.addEventListener("click", () => {
  clearInterval(intervalId);
  intervalId = null;
  updateUI("Stopped");
});

cleanup.addEventListener("click", () => {
  leakyArray = [];
  updateUI("Cleaned");
});
