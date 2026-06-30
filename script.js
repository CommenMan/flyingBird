let bird = document.querySelector(".bird");
bird.style.top = 200 + "px";
bird.style.left = 15 + "px";

let moveUp = -15;
let moveDown = 10;
let moveRight = 10;
let moveLeft = -10;
let gravity = 2;

let birdMoment = (event) => {
  switch (event.key) {
    case "ArrowUp":
      bird.style.top = `${parseInt(bird.style.top) + moveUp}px`;
      //   console.log("bird top position ", bird.style.top);
      break;
    case "ArrowDown":
      bird.style.top = `${parseInt(bird.style.top) + moveDown}px`;
      //   console.log("bird top position ", bird.style.top);
      break;
    case "ArrowLeft":
      bird.style.left = `${parseInt(bird.style.left) + moveLeft}px`;
      break;
    case "ArrowRight":
      bird.style.left = `${parseInt(bird.style.left) + moveRight}px`;
  }
};

document.addEventListener("keydown", birdMoment);

let gameBackground = document.querySelector(".game-background");

// set bird boundries

let gameBackgroundDimensions = gameBackground.getBoundingClientRect();
let [
  gameBackgroundTop,
  gameBackgroundBottom,
  gameBackgroundLeft,
  gameBackgroundRight,
] = [
  gameBackgroundDimensions.top,
  gameBackgroundDimensions.bottom,
  gameBackgroundDimensions.left,
  gameBackgroundDimensions.right,
];

let gravityIntervalID = setInterval(() => {
  // let birdTopPosition = bird.getBoundingClientRect().top;
  // let birdBottomPosition = bird.getBoundingClientRect().bottom;
  // let birdLeftPosition = bird.getBoundingClientRect().left;
  // let birdRightPosition = bird.getBoundingClientRect().right;

  bird.style.top = `${parseInt(bird.style.top) + gravity}px`;
  // if (
  //   birdTopPosition < gameBackgroundTop ||
  //   birdBottomPosition > gameBackgroundBottom ||
  //   birdLeftPosition < gameBackgroundLeft ||
  //   birdRightPosition > gameBackgroundRight
  // ) {
  //   console.log("game is over");
  //   clearInterval(id);
  //   bird.remove();
  // }
}, 100);

//create obstacles topside and downside

function createObstacle() {
  let height = Math.ceil(Math.random() * 20);
  let obstacle = document.createElement("div");
  obstacle.style.cssText = `height: ${height}rem;
        width: 40px;
        background-color:brown;
        position: absolute;
        // border-radius: 1rem;
        border: .2rem dashed black;
        background-color: green;
        top: ${Math.floor(Math.random() * 2) ? 0 : `calc(100% - ${height}rem)`};
        //    top:calc(100% - ${height}rem);
        left: ${gameBackgroundRight - 40}px;
        z-index: 1;
        `;
  return obstacle;
}

let number = 0;
let gameOver = document.querySelector(".game-over");
let score = document.querySelector(".score");
let arrayOfMotionId = [];
let obstacleInterval = setInterval(() => {
  let obstacle = createObstacle();
  number++;
  gameBackground.append(obstacle);
  // obstacle.innerHTML = `my number is ${number}`;

  let travelingDistance = gameBackground.getBoundingClientRect().width - 40;
  let motionID = setInterval(() => {
    let birdTop = bird.getBoundingClientRect().top;
    let birdBottom = bird.getBoundingClientRect().bottom;
    let birdLeft = bird.getBoundingClientRect().left;
    let birdRight = bird.getBoundingClientRect().right;

    let obstacleTop = obstacle.getBoundingClientRect().top;
    let obstacleBottom = obstacle.getBoundingClientRect().bottom;
    let obstacleLeft = obstacle.getBoundingClientRect().left;
    let obstacleRight = obstacle.getBoundingClientRect().right;

    if (
      birdTop <= gameBackgroundTop ||
      birdBottom >= gameBackgroundBottom ||
      birdLeft <= gameBackgroundLeft ||
      birdRight >= gameBackgroundRight
    ) {
      console.log("game is over");
      console.log("birdbottom", birdBottom, "bgbottom", gameBackgroundBottom);
      clearInterval(motionID);
      clearInterval(gravityIntervalID);
      clearInterval(obstacleInterval);

      clearInterval(milisecondInterval);
      clearInterval(secondInterval);
      clearInterval(minuteInterval);
      gameOver.style.display = "flex";
      score.innerText = `score is ${minute}:${second}:${milisecond}`;
      document.removeEventListener("keydown", birdMoment);
    }

    if (
      birdLeft <= obstacleRight &&
      birdRight >= obstacleLeft &&
      birdTop <= obstacleBottom &&
      birdBottom >= obstacleTop
    ) {
      console.log(gameOver);
      arrayOfMotionId.forEach((e) => clearInterval(e));
      clearInterval(obstacleInterval);
      clearInterval(gravityIntervalID);

      clearInterval(milisecondInterval);
      clearInterval(secondInterval);
      clearInterval(minuteInterval);

      document.removeEventListener("keydown", birdMoment);
      gameOver.style.display = "flex";
      score.innerText = `score is ${minute}:${second}:${milisecond}`;
    }
    if (travelingDistance == 0) {
      // obstacle.style.display = "none";
      clearInterval(motionID);
      let obstacleWidth = obstacle.getBoundingClientRect().width;
      let widthID = setInterval(() => {
        if (obstacleWidth == 0) {
          clearInterval(widthID);
          obstacle.remove();
          arrayOfMotionId.shift();
        }
        obstacleWidth--;
        obstacle.style.width = obstacleWidth + "px";
      }, 1);
    } else {
      travelingDistance--;
      obstacle.style.left = travelingDistance + "px";
    }
    // if (travelingDistance + 40 == 0) {
    //   console.log("stop the game");
    //   obstacle.remove();
    //   console.log(obstacle.innerHTML);
    //   clearInterval(obstacleID);
    // }
  }, 5);
  arrayOfMotionId.push(motionID);
  console.log(arrayOfMotionId);
}, 1200);

// setTimeout(() => {
//   clearInterval(obstacleInterval);
// }, 5000);

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    // The user left the page (switched tabs/minimized). Pause your script here.
    console.log("Script paused");

    window.location.reload();
  } else {
    // The user returned to the page. Resume your script here.
    console.log("Script resumed");
  }
});

let timmerDiv = document.querySelector(".timmer");
let minute = 0;
let second = 0;
let milisecond = 0;
let timmer = timmerDiv.querySelector("h3");

// timmer.innerHTML = `<span>${minute}</span> <span> ${second}</span> <span>${milisecond} </span>`;

let milisecondInterval = setInterval(() => {
  milisecond++;
  timmer.innerHTML = `<span>${minute}</span>:<span> ${second}</span>:<span>${milisecond} </span>`;
}, 1);
let secondInterval = setInterval(() => {
  milisecond = 0;
  second++;
  timmer.innerHTML = `<span>${minute}</span>:<span> ${second}</span>:<span>${milisecond} </span>`;
}, 1000);

let minuteInterval = setInterval(() => {
  milisecond = 0;
  second = 0;
  minute++;
  timmer.innerHTML = `<span>${minute}</span>:<span> ${second}</span>:<span>${milisecond} </span>`;
}, 60000);
