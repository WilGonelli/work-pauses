import { openModal } from "./modal.js";
import { exercises } from "./exercises.js";

const sentadoBtn = document.getElementById("sentado-btn");
const totalItensSentado = document.getElementById("total-sentado");
const timeSentado = document.getElementById("time-sentado");

const initPage = () => {
  getValues();
};

const initModal = (type) => {
  openModal(type);
};

document.addEventListener("DOMContentLoaded", initPage);

sentadoBtn.addEventListener("click", () => initModal("alongamento"));

const getValues = async () => {
  let time = 0;
  const sentadoFilter = exercises.filter(
    (exercicio) => exercicio.type === "alongamento",
  );
  for (let index = 0; index < sentadoFilter.length; index++) {
    time += sentadoFilter[index].time;
  }
  const minutos = Math.floor(time / 60);
  const segundos = time % 60;
  const minFormatado = String(minutos).padStart(2, "0");
  const segFormatado = String(segundos).padStart(2, "0");

  timeSentado.innerHTML = `${minFormatado}:${segFormatado}`;
  totalItensSentado.innerHTML = sentadoFilter.length;
};
