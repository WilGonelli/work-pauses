// First commit
import { headerFill } from "./modules/header.js";
import { openModal } from "./modal.js";

const btnStart = document.getElementById("start-btn");

const initHeader = () => {
  headerFill("home");
};

const initModal = () => {
  openModal();
};

document.addEventListener("DOMContentLoaded", initHeader);

btnStart.addEventListener("click", initModal);
