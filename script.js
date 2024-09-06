const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const resetButton =document.getElementById("reset");
let unitSize = 32;
let score = 0;
const ground = new Image();
ground.src = "images/field.png";

const foodImg = new Image();
foodImg.src = "images/strawberry.png";


let food = {
  x: Math.floor(Math.random() * 17 + 1) * unitSize,
  y: Math.floor(Math.random() * 15 + 3) * unitSize,
};

let snake = [];
snake[0] = {
  x: 9 * unitSize,
  y: 10 * unitSize,
};

document.addEventListener("keydown", direction);
let dir;

function direction(event) {
  if (event.key === "ArrowLeft" && dir !== "right") dir = "left";
  else if (event.key === "ArrowUp" && dir !== "down") dir = "up";
  else if (event.key === "ArrowRight" && dir !== "left") dir = "right";
  else if (event.key === "ArrowDown" && dir !== "up") dir = "down";
}

function eatTail(head, arr){
    for(let i=0; i<arr.length;i++){
        if(head.x==arr[i].x && head.y==arr[i].y)
            clearInterval(game);
        
    }
}


function resetGame() {
  
    dir = null;
    score = 0;

    food = {
      x: Math.floor(Math.random() * 17 + 1) * unitSize,
      y: Math.floor(Math.random() * 15 + 3) * unitSize,
    };
  
    snake = [];
    snake[0] = {
      x: 9 * unitSize,
      y: 10 * unitSize,
    };
  
    clearInterval(game);
    game = setInterval(drawGame, 120);
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        resetButton.click();
    }
});


function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i== 0 ?"orange" : "white" ;
    ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);
  }
  ctx.fillStyle = "white";
  ctx.font = "50px Arial ";
  ctx.fillText(score, unitSize * 2.5, unitSize * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * unitSize,
      y: Math.floor(Math.random() * 15 + 3) * unitSize,
    };
  }else{
    snake.pop();
  }

  if(snakeX<unitSize || snakeX>unitSize*17 ||snakeY<3*unitSize || snakeY>unitSize*17){
    clearInterval(game);
  }

  if (dir == "left") snakeX -= unitSize;
  if (dir == "right") snakeX += unitSize;
  if (dir == "up") snakeY -= unitSize;
  if (dir == "down") snakeY += unitSize;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}
let game = setInterval(drawGame, 120);
