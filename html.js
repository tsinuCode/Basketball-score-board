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
}

function startGame() {
    resetAll();
    startTimer();
}

// Score buttons
document.getElementById("home-plus-1").addEventListener("click", () => incrementHome(1));
document.getElementById("home-plus-2").addEventListener("click", () => incrementHome(2));
document.getElementById("home-plus-3").addEventListener("click", () => incrementHome(3));

document.getElementById("guest-plus-1").addEventListener("click", () => incrementGuest(1));
document.getElementById("guest-plus-2").addEventListener("click", () => incrementGuest(2));
document.getElementById("guest-plus-3").addEventListener("click", () => incrementGuest(3));

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
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    gameTime = 60;
    updateTimerDisplay();
    isPaused = false;
}

function togglePauseResume() {
    isPaused = !isPaused;
    document.getElementById("pause-resume-btn").textContent = isPaused ? "Resume" : "Pause";
}

// Start initial display
updateTimerDisplay();
updateUI();

// Control Buttons
document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("reset-btn").addEventListener("click", resetAll);
document.getElementById("pause-resume-btn").addEventListener("click", togglePauseResume);
