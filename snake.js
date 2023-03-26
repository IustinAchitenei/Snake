// get canvas element
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas dimensions and background color
canvas.width = 400;
canvas.height = 400;
ctx.fillStyle = "#f8f8f8";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// set the initial position of the snake
let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;

// set the position of the food
let food = { x: 0, y: 0 };

// set the score
let score = 0;
const scoreElement = document.getElementById("score");

// generate a random position for the food
function generateFoodPosition() {
  food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// draw the snake
function drawSnake() {
    ctx.fillStyle = "#336699";
    for (let i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
  }

// draw the food
function drawFood() {
    ctx.fillStyle = "#ff4500";
    ctx.fillRect(food.x, food.y, 10, 10);
  }

// update the snake's position
function updateSnake() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFoodPosition();
    score += 10;
    scoreElement.innerHTML = `Score: ${score}`;
  } else {
    snake.pop();
  }
}

// check if the snake has collided with the walls or itself
function checkCollisions() {
  if (
    snake[0].x < 0 ||
    snake[0].x > canvas.width - 10 ||
    snake[0].y < 0 ||
    snake[0].y > canvas.height - 10
  ) {
    gameOver();
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver();
    }
  }
}

// game over function
function gameOver() {
  clearInterval(gameLoop);
  alert(`Game over! Your score is ${score}`);
  snake = [{ x: 200, y: 200 }];
  dx = 10;
  dy = 0;
  score = 0;
  scoreElement.innerHTML = `Score: ${score}`;
  generateFoodPosition();
  gameLoop = setInterval(game, 100);
}

// main game function
function game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updateSnake();
  drawSnake();
  drawFood();
  checkCollisions();
}

// generate initial food position and start game loop
generateFoodPosition();
let gameLoop = setInterval(game, 100);

// listen for arrow key presses and update snake's direction
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft" && dx !== 10) {
      dx = -10;
      dy = 0;
    } else if (event.code === "ArrowRight" && dx !== -10) {
      dx = 10;
      dy = 0;
    } else if (event.code === "ArrowUp" && dy !== 10) {
      dx = 0;
      dy = -10;
    } else if (event.code === "ArrowDown" && dy !== -10) {
      dx = 0;
      dy = 10;
    }
  });
  