const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = ["red", "blue", "orange", "purple"];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decraseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decraseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
  board.innerHTML = `<h1>Счет:<span class=primary> ${score}</span></h1>`;
  timeEl.parentNode.classList.add("hide");
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRondomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRondomNumber(0, width - size);
  const y = getRondomNumber(0, height - size);
  circle.style.background = getRendomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRondomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
  const color = getRendomColor();
  element.style.backgroundColor = color;
}

function getRendomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
