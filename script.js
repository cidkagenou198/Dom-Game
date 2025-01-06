const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const difficultySelect = document.getElementById('difficulty');
const loadingScreen = document.getElementById('loadingScreen');
let score = 0;
let timeLeft = 30;
let timer;

function showLoadingScreen() {
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        resetGame();
    }, 2000);
}

function createTarget() {
    const target = document.createElement('div');
    target.classList.add('target');
    target.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
    target.style.top = `${Math.random() * (gameArea.clientHeight - 50)}px`;

    target.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        target.style.transform = 'scale(0)';
        setTimeout(() => {
            gameArea.removeChild(target);
            createTarget();
        }, 300);
    });

    gameArea.appendChild(target);
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function resetGame() {
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        score = 0;
        scoreDisplay.textContent = score;
        timeLeft = 30;
        timeDisplay.textContent = timeLeft;
        gameArea.innerHTML = '';
        startTimer();
        createTarget();
    }, 1000);
}

difficultySelect.addEventListener('change', resetGame);

showLoadingScreen();
