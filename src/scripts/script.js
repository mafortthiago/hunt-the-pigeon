const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time"),
    score: document.querySelector("#score"),
  },
  values: {
    gameVelocity: 700,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
    resetGame: function () {
      this.timerId = null;
      this.countDownTimerId = null;
      state.values.result = 0;
      state.values.curretTime = 60;
      state.view.score.textContent = state.values.result;
      state.view.timeLeft.textContent = state.values.curretTime;
    },
  },
};

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    alert("Game Over! O seu resultado foi: " + state.values.result);
    state.actions.resetGame();
  }
}

function playSound() {
  let audio = new Audio("./src/sounds/sound.mp3");
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
