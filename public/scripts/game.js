// Game canvas dimensions
let boardWidth = 360; 
let boardHeight = 640; 

// Game assets and state variables
let backgroundImg = new Image();
let gameOverAlertShown = false;
backgroundImg.src = "../images/flappybirdbg.png"; 

document.addEventListener("keydown", handleKeyDown); 
document.addEventListener("touchstart", handleTouch, { passive: false });

// Game states
let GAME_STATE = {
    MENU: "menu",
    PLAYING: "playing", 
    GAME_OVER: "gameOver"
}; 
let currentState = GAME_STATE.MENU;

// UI element positions and dimensions
let playButton = {
    x: boardWidth / 2 - 115.5 / 2,
    y: boardHeight / 2 - 64 / 2,
    width: 115,
    height: 64
};

let logo = {
    x: boardWidth / 2 - 300 / 2,
    y: boardHeight / 4,
    width: 300,
    height: 100
}; 

let flappyBirdTextImg = new Image();
flappyBirdTextImg.src = "/images/flappyBirdLogo.png";

let gameOverImg = new Image(); 
gameOverImg.src = "/images/flappy-gameover.png";

let bird = {
    x: 50,
    y: boardHeight / 2,
    width: 40,
    height: 30
}

// Physics constants (in pixels per second)
let lastTime = 0;
let velocityY = 0;
let velocityX = -120; // Horizontal pipe movement speed
let gravity = 30;     // Gravity acceleration
let birdY = boardHeight / 2; 

// Pipe properties
let pipeWidth = 60; 
let pipeGap = 130;    // Vertical space between pipes
let pipeArray = []; 
let pipeIntervalId; 

//Creates a new pair of pipes with random heights
function createPipes() {
    let maxTopPipeHeight = boardHeight - pipeGap - 50;
    let topPipeHeight = Math.floor(Math.random() * maxTopPipeHeight); 
    let bottomPipeHeight = boardHeight - topPipeHeight - pipeGap;

    let topPipe = {
        x: boardWidth,
        y: 0,
        width: pipeWidth, 
        height: topPipeHeight,
        img: topPipeImg,
        passed: false
    };

    let bottomPipe = {
        x: boardWidth, 
        y: topPipeHeight + pipeGap, 
        width: pipeWidth, 
        height: bottomPipeHeight,
        img: bottomPipeImg,
        passed: false
    };
    pipeArray.push(topPipe, bottomPipe); 
}

//Initializes game assets and starts the game loop
window.onload = function() {
    board = document.getElementById("board"); 
    board.height = boardHeight; 
    board.width = boardWidth;
    context = board.getContext("2d"); 

    birdImg = new Image(); 
    birdImg.src = "/images/flappybird.png"; 

    topPipeImg = new Image();
    topPipeImg.src = "/images/toppipe.png"; 

    bottomPipeImg = new Image(); 
    bottomPipeImg.src = "/images/bottompipe.png"; 

    playButtonImg = new Image(); 
    playButtonImg.src = "/images/flappyBirdPlayButton.png"; 

    requestAnimationFrame(update); 
}

//Main game loop - handles different game states
function update(currentTime = 0) {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    if(currentState === GAME_STATE.MENU) {
        renderMenu();
    } else if(currentState === GAME_STATE.PLAYING) {
        renderGame(deltaTime);
    } else if(currentState === GAME_STATE.GAME_OVER) {
        renderGameOver();
    }
}

//Renders menu screen with logo and start instructions
function renderMenu() {
    if(backgroundImg.complete) {
        context.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight); 
    }

    if(playButtonImg.complete) {
        context.drawImage(playButtonImg, playButton.x, playButton.y, playButton.width, playButton.height); 
    }

    if(flappyBirdTextImg.complete) {
        let scaledWidth = logo.width; 
        let scaledHeight = (flappyBirdTextImg.height / flappyBirdTextImg.width) * scaledWidth; 
        context.drawImage(flappyBirdTextImg, logo.x, logo.y, scaledWidth, scaledHeight); 
    }

    document.fonts.ready.then(() => {
        context.fillStyle = "white"; 
        context.font = "15px 'Press Start 2P'"; 
        context.textAlign = "center";
        if (window.innerWidth < 600) {
            context.fillText("Tap to Start", boardWidth / 2, 400);
        } else {
            context.fillText("Press Space to Start", boardWidth / 2, 400);
        }
    });
}

//Renders game state with bird movement and pipe scrolling
function renderGame(deltaTime) {
    velocityY += gravity * deltaTime;
    bird.y = Math.max(bird.y + velocityY * deltaTime * 60, 0);
    context.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);
    context.save();
    context.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    let angle = velocityY * 0.1;
    angle = Math.max(Math.min(angle, 1.57), -0.436);
    context.rotate(angle);
    context.drawImage(birdImg, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    context.restore();

    if(bird.y > board.height) {
        currentState = GAME_STATE.GAME_OVER;
    }

    for(let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX * deltaTime;

        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); 

        if(!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if(detectCollision(bird, pipe)) {
            currentState = GAME_STATE.GAME_OVER;
        }
    }

    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
        pipeArray.shift();
    }

    document.fonts.ready.then(() => {
        context.fillStyle = "white"; 
        context.font = "45px 'Press Start 2P'"; 
        context.textAlign = "left"; 
        context.fillText(score, 10, 55);
    });
}

//Renders game over screen with final score
function renderGameOver() {
    context.drawImage(backgroundImg, 0, 0, boardWidth, boardHeight);
    if(gameOverImg.complete) {
        let imgWidth = 400; 
        let imgHeight = 80; 
        let x = (boardWidth - imgWidth) / 2; 
        let y = boardHeight / 3;
        context.drawImage(gameOverImg, x, y, imgWidth, imgHeight); 
        document.fonts.ready.then(() => {
            let scoreText = `Your score: ${Math.floor(score)}`; 
            context.fillStyle = "white"; 
            context.font = "23px 'Press Start 2P'"; 
            context.textAlign = "center"; 
            context.fillText(scoreText, boardWidth / 2, y + imgHeight + 50); 

            context.font = "10px 'Press Start 2P'"; 
            if (window.innerWidth < 600) {
                context.fillText("Tap to Return to Menu", boardWidth / 2, y + imgHeight + 105);
            } else {
                context.fillText("Press Space to Return to Menu", boardWidth / 2, y + imgHeight + 105);
            }
        });

        if (!gameOverAlertShown) {
            alert(`Game Over! Your score: ${Math.floor(score)}`);
            gameOverAlertShown = true;
        }
    }
}

//Handles touch input for mobile devices
function handleTouch(e) {
    const rect = board.getBoundingClientRect();
    
    const touch = e.touches[0];
    
    if (touch.clientX >= rect.left && 
        touch.clientX <= rect.right && 
        touch.clientY >= rect.top && 
        touch.clientY <= rect.bottom) {
        e.preventDefault();
        handleInput();
    }
}

//Handles keyboard input
function handleKeyDown(e) {
    if(e.code === "Space") {
        e.preventDefault();
        handleInput();
    }
}

//Common input handler for both touch and keyboard
function handleInput() {
    if(currentState === GAME_STATE.MENU) {
        startGame();
    } else if(currentState === GAME_STATE.GAME_OVER) {
        resetGame();
        currentState = GAME_STATE.MENU;
    } else if(currentState === GAME_STATE.PLAYING) {
        velocityY = -8; // pixels per second
    }
}

//Initializes a new game session
function startGame() {
    currentState = GAME_STATE.PLAYING; 
    resetGame();

    if(pipeIntervalId) {
        clearInterval(pipeIntervalId);
    }

    pipeIntervalId = setInterval(createPipes, 1700); 
}

//Resets game state to initial values
function resetGame() {
    bird.y = birdY;
    velocityY = 0; 
    pipeArray = []; 
    score = 0;
    gameOverAlertShown = false;
}

//Checks for collision between two rectangles
function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x && 
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}