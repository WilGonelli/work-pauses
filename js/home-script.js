import { openModal } from "./modal.js";
import { exercises } from "./exercises.js";

const stretchingBtn = document.getElementById("stretching-btn");
const totalStretchingItems = document.getElementById("total-stretching");
const timeStretching = document.getElementById("time-stretching");
const cardioBtn = document.getElementById("cardio-btn");
const totalCardioItems = document.getElementById("total-cardio");
const timeCardio = document.getElementById("time-cardio");

const initPage = () => {
  getValues();
};

const initModal = (type) => {
  openModal(type);
};

document.addEventListener("DOMContentLoaded", initPage);

stretchingBtn.addEventListener("click", () => initModal("alongamento"));
cardioBtn.addEventListener("click", () => initModal("cardio"));

const getValues = async () => {
  let stretchingTime = 0;
  let cardioTime = 0;
  const stretchingFilter = exercises.filter(
    (exercise) => exercise.type === "alongamento",
  );
  const cardioFilter = exercises.filter(
    (exercise) => exercise.type === "cardio",
  );
  for (let index = 0; index < stretchingFilter.length; index++) {
    stretchingTime +=
      stretchingFilter[index].time * stretchingFilter[index].side.length +
      stretchingFilter[index].pauseTime * (stretchingFilter[index].side.length - 1);
  }
  for (let index = 0; index < cardioFilter.length; index++) {
    cardioTime +=
      cardioFilter[index].time * cardioFilter[index].side.length +
      cardioFilter[index].pauseTime * (cardioFilter[index].side.length - 1);
  }
  let minutes = Math.floor(stretchingTime / 60);
  let seconds = stretchingTime % 60;
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  timeStretching.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  totalStretchingItems.innerHTML = stretchingFilter.length;

  minutes = Math.floor(cardioTime / 60);
  seconds = cardioTime % 60;
  formattedMinutes = String(minutes).padStart(2, "0");
  formattedSeconds = String(seconds).padStart(2, "0");

  timeCardio.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
  totalCardioItems.innerHTML = cardioFilter.length;
};
