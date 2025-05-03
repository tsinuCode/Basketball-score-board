// Load sound for scoring and buzzer
const scoreSound = new Audio("score.mp3");
const buzzerSound = new Audio("buzzer.mp3");

function playScoreSound() {
    scoreSound.currentTime = 0;
    scoreSound.play();
}

function playBuzzer() {
    buzzerSound.currentTime = 0;
    buzzerSound.play();
}

let homeScore = 0;
let guestScore = 0;

const homeScoreEl = document.getElementById("home-score");
const guestScoreEl = document.getElementById("guest-score");

function updateUI() {
    homeScoreEl.textContent = homeScore;
    guestScoreEl.textContent = guestScore;
}

// Helper function to enable or disable score buttons
function setScoreButtonsEnabled(enabled) {
    const scoreButtons = document.querySelectorAll(".score-buttons button");
    scoreButtons.forEach(button => {
        button.disabled = !enabled;
    });
}

function incrementHome(points) {
    homeScore += points;
    playScoreSound();
    updateUI();
}

function incrementGuest(points) {
    guestScore += points;
    playScoreSound();
    updateUI();
}

function resetScore() {
    homeScore = 0;
    guestScore = 0;
    updateUI();
}

function resetAll() {
    resetScore();
    resetTimer();
    setScoreButtonsEnabled(false);
}

function startGame() {
    // Start the timer without resetting scores or timer if already running
    if (!timerInterval) {
        startTimer();
        setScoreButtonsEnabled(true);
    }
}

function newGame() {
    resetAll();
    startTimer();
    setScoreButtonsEnabled(true);
}

// Game Timer Logic
let gameTime = 60; // seconds
let timerInterval;
let isPaused = false;
const timerDisplay = document.getElementById("gameTimer");

function updateTimerDisplay() {
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    isPaused = false;
    timerInterval = setInterval(() => {
        if (!isPaused && gameTime > 0) {
            gameTime--;
            updateTimerDisplay();
            if (gameTime === 0) {
                playBuzzer();
                clearInterval(timerInterval);
                timerInterval = null;
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    gameTime = 60;
    updateTimerDisplay();
    isPaused = false;
}

function togglePauseResume() {
    isPaused = !isPaused;
    document.getElementById("pause-resume-btn").textContent = isPaused ? "Resume" : "Pause";
}

setScoreButtonsEnabled(false); // Disable score buttons initially

// Start initial display
updateTimerDisplay();
updateUI();
