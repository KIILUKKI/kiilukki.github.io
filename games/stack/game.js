const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let stack = [];
let currentBox;
let gameOver = false;
let speed = 2;
let direction = 1;
let score = 0;

function startGame() {
  stack = [{ x: 100, y: canvas.height - 30, width: 200, color: "#38bdf8" }];
  addNewBox();
  gameOver = false;
  score = 0;
  animate();
}

function addNewBox() {
  const last = stack[stack.length - 1];
  const newBox = {
    x: 0,
    y: last.y - 30,
    width: last.width,
    color: randomColor()
  };
  currentBox = newBox;
}

function randomColor() {
  const colors = ["#38bdf8", "#0ea5e9", "#2563eb", "#1d4ed8", "#3b82f6"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function placeBox() {
  const last = stack[stack.length - 1];
  const diff = currentBox.x - last.x;

  if (Math.abs(diff) < currentBox.width) {
    // Cut the piece
    const newWidth = currentBox.width - Math.abs(diff);
    currentBox.width = newWidth;
    if (diff > 0) {
      currentBox.x = last.x + diff;
    }
    stack.push(currentBox);
    addNewBox();
    score++;
  } else {
    // Missed → Game Over
    gameOver = true;
    setTimeout(() => alert("Game Over! Score: " + score), 100);
  }
}

function animate() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stack
  stack.forEach(b => {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.width, 30);
  });

  // Move current box
  currentBox.x += speed * direction;
  if (currentBox.x + currentBox.width > canvas.width || currentBox.x < 0) {
    direction *= -1;
  }

  // Draw current box
  ctx.fillStyle = currentBox.color;
  ctx.fillRect(currentBox.x, currentBox.y, currentBox.width, 30);

  requestAnimationFrame(animate);
}

window.addEventListener("keydown", e => {
  if (e.code === "Space" && !gameOver) {
    placeBox();
  } else if (e.code === "Enter" && gameOver) {
    startGame();
  }
});

canvas.addEventListener("click", () => {
  if (!gameOver) {
    placeBox();
  } else {
    startGame();
  }
});

startGame();
