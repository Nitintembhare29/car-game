const startContainer = document.querySelector(".start");
const gameContainer = document.querySelector(".game");
const scoreContainer = document.querySelector(".score");
const scoreId = document.querySelector("#score-id");


let score = 0;
let carPosition = {
  x : 0,
  y : 0,
  speed : 2
};

let p2={};

let player = {
  ArrowUp : false,
  ArrowDown : false,
  ArrowLeft : false,
  ArrowRight : false
};

function moveLine(){
  var roadLines = document.querySelectorAll('.line');

  roadLines.forEach(line => {
    var top = line.offsetTop;
     const gameContainerDetails = gameContainer.getBoundingClientRect();
    if (line.offsetTop > gameContainerDetails.bottom) {
      top = 0;
    }
    // update the top value;
    line.style.top = top + carPosition.speed + 'px';
});
}

function endGame(){
  p2.startGame=false;
  startContainer.classList.remove('hide');
  startContainer.innerHTML="Game Over <br> Your final score is "+(score+1)+"<br>Press here to start the Game"
}

function moveEnemy(car) {
  const enemy = document.querySelectorAll('.enemy');
 
  enemy.forEach(item => {
    if(isCollide(car,item)){
      console.log("Game over !!");
      endGame();
    }

  if (item.y >= 750) {
  item.y -= 900;
  item.style.left = Math.floor(Math.random() * 350) + "px";
  }
  item.y += carPosition.speed;
  item.style.top = item.y + "px";
  })
  }
  //check whether the cars collide or not
  function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
  }

//   game is end
// function endGame() {
//   player.isStart = false;
//   player.speed = 5;
//   startScreen.classList.remove('hide');
//   }

function renderGame(milliseconds){

  const car = document.querySelector('.car');

  if(p2.startGame){
    moveLine();
    moveEnemy(car);

    const gameContainerDetails = gameContainer.getBoundingClientRect();
  
  // we can create an animation loop
  if(player.ArrowDown && carPosition.y < gameContainerDetails.bottom - 160 ){
    carPosition.y += carPosition.speed;
  }

  if(player.ArrowUp && carPosition.y > gameContainerDetails.top-40){
    carPosition.y -= carPosition.speed;
  }

  if(player.ArrowRight && carPosition.x < gameContainerDetails.width -55){
    carPosition.x += carPosition.speed;
  }

  if(player.ArrowLeft && carPosition.x > 0){
    carPosition.x -= carPosition.speed;
  }
  
  score++;
  scoreId.textContent = score;

  // updated position
  car.style.top = carPosition.y + 'px';
  car.style.left = carPosition.x + 'px';

  window.requestAnimationFrame(renderGame); 
  }
};

function startGame(){
  // as the game start, start container should hide
  startContainer.classList.add('hide');
//   startContainer.setAttribute('class', 'hide');   

gameContainer.innerHTML="";
score = 0;

// create car
     const car = document.createElement('div');
     car.setAttribute('class','car');

    //  add it inside game container
     gameContainer.appendChild(car);
    // car position
    const carTop = car.offsetTop;
    const carLeft = car.offsetLeft;
    carPosition.y = car.offsetTop;  // carTop;
    carPosition.x = car.offsetLeft; //carLeft;

// create  road lines and add them in game container
     var x = 0;      // it will be used to start line from top and will give space between line
     for(var i=0; i<4; i++){
      const line = document.createElement("div");
      line.classList.add('line');
      line.style.top = x +"px";
      gameContainer.appendChild(line);
      x += 150;
     }

     // creating enemy car
     for(x=0;x<3;x++){
      const enemyDiv = document.createElement('div');
      enemyDiv.classList.add("enemy");
      enemyDiv.y=((x+1)*350)*-1;
      enemyDiv.style.top=enemyDiv.y+"px";
      enemyDiv.style.backgroundColor= randomColor();
      //enemyDiv.style.top = Math.floor(Math.random() * 400) + "px";
      enemyDiv.style.left = Math.floor(Math.random() * 350) + "px";
 
      gameContainer.appendChild(enemyDiv);
      
      p2.startGame=true;
      window.requestAnimationFrame(renderGame);
      }
      
}

function randomColor() {
  var letters = '3123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function handleKeyUp(e){
  e.preventDefault(); 
  player[e.key] = false;
}

function handleKeyDown(e){
  e.preventDefault(); 
  player[e.key] = true;
}

document.addEventListener('keyup', handleKeyUp);
document.addEventListener('keydown', handleKeyDown);

startContainer.addEventListener('click', startGame);