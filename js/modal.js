import { exercises } from "./exercises.js";
import { modalContent } from "./modules/modal-content.js";

const modal = document.getElementById("modal");

let timeLeft = 0;
let timerInterval = null;
let currentExerciseIndex = 0;
let isRunning = false;
let exerciseType = null;

export function openModal(type) {
  modal.classList.add("show");
  timerInterval = null;
  currentExerciseIndex = 0;
  exerciseType = type;
  modalContentInit();
}

function closeModal() {
  modal.classList.remove("show");
}

async function startTimer(totalTime, sides) {
  if (timerInterval) clearInterval(timerInterval);

  timeLeft = totalTime;
  isRunning = true;
  const sideSplit = sides.split(",");
  modalContentInit();

  const size = sideSplit.length;

  const modalTimer = document.getElementById("modal-timer");
  const timerContainer = document.getElementById("timerContainer");
  const timerText = document.getElementById("timerText");
  const sideText = document.getElementById("side");

  if (!timerContainer || !timerText) return;

  try {
    modalTimer.classList.toggle("show-timer");
    const count = (pause = false) => {
      return new Promise((resolve) => {
        // Reset the time for each side (in case full time is needed for each)
        const timerActive = pause ? 10 : totalTime;
        let timePerSide = timerActive;
        timerText.textContent = timePerSide;

        timerInterval = setInterval(() => {
          const elapsedTime = timerActive - timePerSide;
          const progressDeg = (elapsedTime / timerActive) * 360;

          timerContainer.style.setProperty("--progress", `${progressDeg}deg`);
          timerText.textContent = timePerSide;

          if (timePerSide > 0) {
            timePerSide--;
          } else {
            clearInterval(timerInterval);
            resolve(); // <--- Notifies 'await' that this countdown is finished and can proceed to the next side!
          }
        }, 1000);
      });
    };

    for (let i = 0; i < size; i++) {
      console.log(sideSplit[i]);
      sideText.textContent = sideSplit[i];
      await count();
      if (i + 1 < size) {
        sideText.textContent = "Rest";
        await count(true);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    modalTimer.classList.toggle("show-timer");
    isRunning = false;
    modalContentInit();
  }
}

function nextExercise() {
  if (currentExerciseIndex < exercises.length - 1) {
    if (timerInterval) clearInterval(timerInterval); // Stops the current timer when changing exercise
    currentExerciseIndex++;
    isRunning = false;
    modalContentInit();
  }
}

function prevExercise() {
  if (currentExerciseIndex > 0) {
    if (timerInterval) clearInterval(timerInterval); // Stops the current timer when changing exercise
    currentExerciseIndex--;
    isRunning = false;
    modalContentInit();
  }
}

window.startTimer = startTimer;
window.closeModal = closeModal;
window.nextExercise = nextExercise;
window.prevExercise = prevExercise;

async function modalContentInit() {
  if (!exercises || exercises.length < 1) {
    modal.innerHTML = `<p>Failed to load exercises</p>`;
    return;
  }

  const exercisesFiltered = exercises.filter((ex) => ex.type === exerciseType);

  const exercise = exercisesFiltered[currentExerciseIndex];

  const isFirst =
    currentExerciseIndex === 0
      ? "disabled style='opacity: 0.3; cursor: not-allowed;'"
      : "";
  const isLast =
    currentExerciseIndex === exercisesFiltered.length - 1
      ? "disabled style='opacity: 0.3; cursor: not-allowed;'"
      : "";

  const isRunningAttr = isRunning
    ? "disabled style='opacity: 0.5; cursor: not-allowed;'"
    : "";

  const content = modalContent(exercise, isFirst, isLast, isRunningAttr);

  modal.innerHTML = content;
}
