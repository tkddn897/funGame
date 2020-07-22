"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const game__btn = document.querySelector(".game__button");
const game__timer = document.querySelector(".game__timer");
const game__score = document.querySelector(".game__score");

const popUp = document.querySelector(".pup-up__hide");
const popupText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const bgSound = new Audio("./sound/bg.mp3");
const WinSound = new Audio("./sound/game_win.mp3");
const alertSound = new Audio("./sound/alert.wav");

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener("click", onFiledClick);

game__btn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", () => {
  startGame();
  hideGamePopUp();
});

function startGame() {
  started = true;
  showTimerAndScore();
  initGame();
  showStopButton();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText("REPLAY?");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    playSound(WinSound);
  } else {
    playSound(bugSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win ? "you won" : "YOU LOST");
}

function showStopButton() {
  const icon = game__btn.querySelector(".fas");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  game__btn.style.visibility = "visible";
}

function hideGameButton() {
  game__btn.style.visibility = "hidden";
}

function hideGamePopUp() {
  popUp.classList.add("pup-up__hide");
}

function showTimerAndScore() {
  game__timer.style.visibility = "visible";
  game__score.style.visibility = "visible";
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
  hideGameButton();
  showPopUpWithText("REPLAY?");
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  game__timer.innerText = `${minutes}:${seconds}`;
  if (time === 0) {
    stopGame();
  }
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  game__score.innerHTML = CARROT_COUNT;
  console.log(fieldRect);
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
}

function onFiledClick(event) {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    playSound(bugSound);
    finishGame(false);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  game__score.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = reandomNumber(x1, x2);
    const y = reandomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function showPopUpWithText(text) {
  popupText.innerText = text;
  popUp.classList.remove("pup-up__hide");
}

function reandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
