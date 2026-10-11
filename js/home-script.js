// First commit
import { headerFill } from "./modules/header.js";

const initHeader = () => {
  headerFill("home");
};

document.addEventListener("DOMContentLoaded", initHeader);

const totalTime = 20; // Tempo em segundos
let timeLeft = totalTime;

const timerContainer = document.getElementById("timerContainer");
const timerText = document.getElementById("timerText");
const startTimer = document.getElementById("timer-btn");

startTimer.addEventListener("click", function (event) {
  event.preventDefault();
  updateTimer();
});

function updateTimer() {
  // Calcula quantos graus o círculo deve ter baseado no tempo restante
  // Quando timeLeft for 20, progress = 0deg. Quando timeLeft for 0, progress = 360deg.
  const elapsedTime = totalTime - timeLeft;
  const progressDeg = (elapsedTime / totalTime) * 360;

  // Atualiza a variável CSS no elemento
  timerContainer.style.setProperty("--progress", `${progressDeg}deg`);

  // Atualiza o texto na tela
  timerText.textContent = timeLeft;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000); // Executa a cada 1 segundo
  } else {
    // Ação quando o timer zerar
    timerText.textContent = "Fim!";
  }
}
