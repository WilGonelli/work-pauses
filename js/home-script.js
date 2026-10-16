import { openModal } from "./modal.js";
import { exercises } from "./exercises.js";

const sentadoBtn = document.getElementById("sentado-btn");
const totalItensSentado = document.getElementById("total-sentado");
const timeSentado = document.getElementById("time-sentado");
const cardioBtn = document.getElementById("cardio-btn");
const totalItensCardio = document.getElementById("total-cardio");
const timeCardio = document.getElementById("time-cardio");

const initPage = () => {
  getValues();
};

const initModal = (type) => {
  openModal(type);
};

document.addEventListener("DOMContentLoaded", initPage);

sentadoBtn.addEventListener("click", () => initModal("alongamento"));
cardioBtn.addEventListener("click", () => initModal("cardio"));

const getValues = async () => {
  let alongamentoTime = 0;
  let cardioTime = 0;
  const sentadoFilter = exercises.filter(
    (exercicio) => exercicio.type === "alongamento",
  );
  const cardioFilter = exercises.filter(
    (exercicio) => exercicio.type === "cardio",
  );
  for (let index = 0; index < sentadoFilter.length; index++) {
    alongamentoTime +=
      sentadoFilter[index].time * sentadoFilter[index].side.length +
      sentadoFilter[index].pauseTime * (sentadoFilter[index].side.length - 1);
  }
  for (let index = 0; index < cardioFilter.length; index++) {
    cardioTime +=
      cardioFilter[index].time * cardioFilter[index].side.length +
      cardioFilter[index].pauseTime * (cardioFilter[index].side.length - 1);
  }
  let minutos = Math.floor(alongamentoTime / 60);
  let segundos = alongamentoTime % 60;
  let minFormatado = String(minutos).padStart(2, "0");
  let segFormatado = String(segundos).padStart(2, "0");

  timeSentado.innerHTML = `${minFormatado}:${segFormatado}`;
  totalItensSentado.innerHTML = sentadoFilter.length;

  minutos = Math.floor(cardioTime / 60);
  segundos = cardioTime % 60;
  minFormatado = String(minutos).padStart(2, "0");
  segFormatado = String(segundos).padStart(2, "0");

  timeCardio.innerHTML = `${minFormatado}:${segFormatado}`;
  totalItensCardio.innerHTML = cardioFilter.length;
};
