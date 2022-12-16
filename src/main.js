"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 10;

const backgroundImg = document.querySelector(".background-img");
const gameBtn = document.querySelector(".game-btn");
const text = document.querySelector(".you-lose-text");
const box = document.querySelector(".you-lose-box");
const field = document.querySelector(".field");
const fieldRect = field.getBoundingClientRect();
const tryagainBtn = document.querySelector(".tryagain-btn");
const timer = document.querySelector(".timer");

const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");

let downloadTimer = undefined;

gameBtn.addEventListener(
  "click",
  () => {
    playClickCarrotGame();
    pauseBtnImg();
    playSound(bgSound);
  },
  { once: true }
);

tryagainBtn.addEventListener("click", () => {
  resetImgs();
  playClickCarrotGame();
  pauseBtnImg();
  playSound(bgSound);
  box.style.display = "none";
});

function playClickCarrotGame() {
  const pauseBtn = document.querySelector(".game-btn");
  pauseBtn.addEventListener("click", () => {
    showBox("Restart?");
    stopTimer();
  });

  makeImgs("img/carrot.png", "carrot", CARROT_COUNT);
  makeImgs("img/bug.png", "bug", BUG_COUNT);

  const bugImg = document.querySelectorAll(".bug");
  console.log(bugImg);

  for (let i = 0; i < bugImg.length; i++) {
    bugImg[i].addEventListener("click", () => {
      showBox("YOU LOSE");
      stopTimer();
      playSound(bugSound);
      stopSound();
    });
  }

  const carrotImg = document.querySelectorAll(".carrot");
  console.log(carrotImg);
  for (let i = 0; i < carrotImg.length; i++) {
    carrotImg[i].addEventListener("click", () => {
      field.removeChild(carrotImg[i]);
      const countCarrots = document.getElementsByClassName("carrot").length;
      console.log(countCarrots);
      const insertCountCarrots = document.querySelector(".carrots-count");
      insertCountCarrots.textContent = countCarrots;
      playSound(carrotSound);
      if (countCarrots == 0) {
        showBox("YOU WIN 👏");
        playSound(winSound);
        stopTimer();
        stopSound();
      }
    });
  }
  loadCountdownTimer();
}

function pauseBtnImg() {
  gameBtn.style.visibility = "visible";
  gameBtn.style.backgroundColor = "red";
  gameBtn.innerHTML = '<i class="fas fa-stop"></i>';
  box.style.display = "none";
}

function resetImgs() {
  const imgs = field.querySelectorAll("img");
  imgs.forEach((element) => field.removeChild(element));
}

function loadCountdownTimer() {
  let timeleft = 9;
  downloadTimer = setInterval(() => {
    if (timeleft <= 0) {
      stopTimer();
      showBox("YOU LOSE");
      return;
    }
    timer.textContent = `00:${timeleft}`;
    timeleft -= 1;
  }, 1000);
}
function stopTimer() {
  clearInterval(downloadTimer);
}

function showBox(result) {
  box.style.display = "block";
  gameBtn.style.backgroundColor = "white";
  gameBtn.innerHTML = '<i class="fas fa-play"></i>';
  gameBtn.style.visibility = "hidden";
  text.textContent = result;
}

function makeImgs(imgPath, className, count) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * (x2 - x1) + x1);
    const y = Math.floor(Math.random() * (y2 - y1) + y1);
    const img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("class", className);
    img.style.position = "absolute";
    img.style.transform = `translate(${x}px,${y}px)`;
    field.appendChild(img);
  }
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound() {
  bgSound.pause();
}
