let trials = 20;
//if winScore = 6 -> win
let winScore = 0;
let gameActive = true;
const score = document.querySelector("#score");

function miss() {
  if (!this.classList.contains("miss") && gameActive) {
    this.classList.add("miss");
    trials--;
    score.innerText = trials;
    if (trials === 0) {
      gameActive = false;
      document.querySelector("#score-label").innerText = "PRZEGRANA!";
      alert("PRZEGRANA");
    }
  }
}

for (let i = 1; i <= 6; i++) {
  const rows = document.querySelector(`#row-${i}`);
  for (let i = 0; i <= 5; i++) {
    const row = rows.children[i];
    row.classList.add("normal");
    row.addEventListener("click", miss);
  }
}

for (let i = 1; i <= 6; i++) {
  const random = Math.floor(Math.random() * 6);
  const area = document.querySelector(`#row-${i}`).children[random];
  area.classList.remove("normal");
  area.removeEventListener("click", miss);
  area.addEventListener("click", function () {
    if (!area.classList.contains("statek") && gameActive) {
      area.classList.add("statek");
      winScore++;
      if (winScore === 6) {
        gameActive = false;
        document.querySelector("#score-label").innerText = "WYGRANA!";
        alert("wygrana");
      }
    }
  });
}
