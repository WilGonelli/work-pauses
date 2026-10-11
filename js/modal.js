import { exercicies } from "./exercicies.js";

const modal = document.getElementById("modal");

let timeLeft = 0;
let timerInterval = null;
let currentExerciseIndex = 0;
let isRunning = false;

export function openModal() {
  modal.classList.toggle("show");
  currentExerciseIndex = 0;
  modalContent();
}

function startTimer(totalTime) {
  if (timerInterval) clearInterval(timerInterval);

  timeLeft = totalTime;
  isRunning = true;
  modalContent();

  const timerContainer = document.getElementById("timerContainer");
  const timerText = document.getElementById("timerText");

  if (!timerContainer || !timerText) return;

  timerInterval = setInterval(() => {
    const elapsedTime = totalTime - timeLeft;
    const progressDeg = (elapsedTime / totalTime) * 360;

    // Atualiza o círculo e o texto
    timerContainer.style.setProperty("--progress", `${progressDeg}deg`);
    timerText.textContent = timeLeft;

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(timerInterval);
      timerText.textContent = "Fim!";
      isRunning = false;
      modalContent();
    }
  }, 1000);
}

function nextExercise() {
  if (currentExerciseIndex < exercicies.length - 1) {
    if (timerInterval) clearInterval(timerInterval); // Para o timer atual ao mudar de tela
    currentExerciseIndex++;
    isRunning = false;
    modalContent();
  }
}

function prevExercise() {
  if (currentExerciseIndex > 0) {
    if (timerInterval) clearInterval(timerInterval); // Para o timer atual ao mudar de tela
    currentExerciseIndex--;
    isRunning = false;
    modalContent();
  }
}

window.startTimer = startTimer;
window.nextExercise = nextExercise;
window.prevExercise = prevExercise;

async function modalContent() {
  if (!exercicies || exercicies.length < 1) {
    modal.innerHTML = `<p> Falha ao buscar exercicios</p>`;
    return;
  }

  const exercicie = exercicies[currentExerciseIndex];

  const isFirst =
    currentExerciseIndex === 0
      ? "disabled style='opacity: 0.3; cursor: not-allowed;'"
      : "";
  const isLast =
    currentExerciseIndex === exercicies.length - 1
      ? "disabled style='opacity: 0.3; cursor: not-allowed;'"
      : "";

  const inRunning = isRunning
    ? "disabled style='opacity: 0.5; cursor: not-allowed;'"
    : "";

  modal.innerHTML = `
        <h2 class="title">${exercicie.name}</h2>
        <div class="exercicie-content">
            <img class="gif-exercicies" src="${exercicie.img}" alt="${exercicie.name}">
            <div class="description-container">
                <p class="description">${exercicie.description}</p>
                <p class="description">
                    Para realizar o exercício, siga os passos abaixo:
                </p>
                ${Object.entries(exercicie.steps)
                  .map(([key, value]) => {
                    return `
                    <p class="description">${key}. ${value}</p>
                    `;
                  })
                  .join("")}
            </div>
        </div>
        <div class="timer-container">
            <button class="arrow" onclick="prevExercise()" ${isFirst}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em"
                    width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
                    </path>
                </svg>
            </button>
            <div class="timer">
                <p id="timerContainer" style="--progress: 0deg;"><span id="timerText">${exercicie.time}</span></p>
                <button class="timer-btn" onclick="startTimer(${exercicie.time})" ${inRunning}>${inRunning ? "running" : "start"}</button>
            </div>
            <button class="arrow" onclick="nextExercise()" ${isLast}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em"
                    width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                    </path>
                </svg>
            </button>
        </div>
        `;
}
