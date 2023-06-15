function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
const game = document.querySelector(".game");
const score = document.querySelector(".score");
const startBtn = document.querySelector("#startBtn");
const removeElements = document.querySelectorAll(".remove");
let gameStarted = false;
let punkty = 0;

startBtn.addEventListener("click", function () {
  removeElements.forEach((element) => element.remove());
  game.classList.remove("hidden");
  score.classList.remove("hidden");
  gameStarted = true;
  setTimeout(() => {
    gameStarted = false;
    alert(`KONIEC CZASU! Udało ci się zdobyć ${punkty} punktów!`);
  }, 30000);
});

window.addEventListener("keyup", function (e) {
  if (gameStarted) {
    if (e.key === "ArrowDown" || e.key === "Down") {
      const currTop = extractPos(avatar.style.top);
      avatar.style.top = `${currTop + 50}px`;
    } else if (e.key === "ArrowUp" || e.key === "Up") {
      const currTop = extractPos(avatar.style.top);
      avatar.style.top = `${currTop - 50}px`;
    } else if (e.key === "ArrowRight" || e.key === "Right") {
      const currLeft = extractPos(avatar.style.left);
      avatar.style.left = `${currLeft + 50}px`;
      avatar.style.transform = "scale(1,1)";
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
      const currLeft = extractPos(avatar.style.left);
      avatar.style.left = `${currLeft - 50}px`;
      avatar.style.transform = "scale(-1,1)";
    }

    if (isTouching(avatar, coin)) {
      moveCoin();
      punkty++;
      score.innerHTML = `<h1>Punkty: ${punkty}</h1>`;
    }
  }
});

extractPos = (pos) => {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

moveCoin();
