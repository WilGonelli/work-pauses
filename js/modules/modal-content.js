export const modalContent = (exercise, isFirst, isLast, isRunningAttr) => {
  return `
            <button class="arrow" onclick="prevExercise()" ${isFirst}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em"
                    width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z">
                    </path>
                </svg>
            </button>
            <div class="exercise-container">
                <h2 class="title">${exercise.name}</h2>
                <div class="exercise-content">
                    <img class="gif-exercises" src="${exercise.img}" alt="${exercise.name}">
                    <div class="description-container">
                        <p class="description">${exercise.description}</p>
                        <p class="description">
                            Para realizar o exercício, siga os passos abaixo:
                        </p>
                        ${Object.entries(exercise.steps)
                          .map(([key, value]) => {
                            return `
                                    <p class="description">${key}. ${value}</p>
                                    `;
                          })
                          .join("")}
                    </div>
                </div>
                <button class="timer-btn" onclick="startTimer(${exercise.time}, '${exercise.side}')" ${isRunningAttr}>
                    ${isRunningAttr ? "running" : "start"}
                </button>
            </div>
            <button class="arrow" onclick="nextExercise()" ${isLast}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em"
                    width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                    </path>
                </svg>
            </button>         
            <button class="close-modal" onclick="closeModal()">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0"
                    viewBox="0 0 512 512" height="40px" width="40px" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" stroke-miterlimit="10" stroke-width="32"
                            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path>
                        <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"
                            d="M320 320 192 192m0 128 128-128"></path>
                </svg>
            </button>
            <div class="modal-timer" id="modal-timer">
                <div class="timer">
                    <p class="side" id="side"></p>
                    <p class="animation-container" id="timerContainer" style="--progress: 0deg;">
                        <span id="timerText"></span>
                    </p>          
                </div>
            </div>
        `;
};
