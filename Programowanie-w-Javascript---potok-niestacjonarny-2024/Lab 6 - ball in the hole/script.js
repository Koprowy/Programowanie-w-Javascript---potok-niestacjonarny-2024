
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const timerElement = document.getElementById('timer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 20, speed: 0.2 }; // Dodajemy parametr speed
let hole = { x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: 30 };
let startTime = Date.now();
let timeElapsed = 0;
let recordTime = null;
let records = [];

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function checkCollision() {
    const dist = Math.hypot(ball.x - hole.x, ball.y - hole.y);
    if (dist < ball.radius + hole.radius) {
        return true;
    }
    return false;
}


window.addEventListener('deviceorientation', handleOrientation);

function handleOrientation(event) {
    let x = event.beta;
    let y = event.gamma;

    x = Math.max(-1, Math.min(1, x / 45));
    y = Math.max(-1, Math.min(1, y / 22.5));

    ball.x += y * ball.speed * 100;
    ball.y += x * ball.speed * 100;

    // Ograniczenie do obszaru ekranu
    if (ball.x < ball.radius) ball.x = ball.radius;
    if (ball.x > canvas.width - ball.radius) ball.x = canvas.width - ball.radius;
    if (ball.y < ball.radius) ball.y = ball.radius;
    if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;
}

window.addEventListener('keydown', function(event) {
    const step = 5;
    if (event.key === "ArrowUp") ball.y -= step;
    if (event.key === "ArrowDown") ball.y += step;
    if (event.key === "ArrowLeft") ball.x -= step;
    if (event.key === "ArrowRight") ball.x += step;
});

// Główna funkcja animacji
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawHole();

    if (checkCollision()) {
        timeElapsed = (Date.now() - startTime) / 1000;
        recordTime = timeElapsed;
        records.push(recordTime);
        alert(`Brawo! Czas: ${timeElapsed.toFixed(2)} sekundy`);
        resetGame();
    }

    updateTimer();
    requestAnimationFrame(animate);
}


function updateTimer() {
    timeElapsed = (Date.now() - startTime) / 1000;
    timerElement.innerText = `Czas: ${timeElapsed.toFixed(2)} sekundy`;
}

// Resetowanie gry
function resetGame() {
    ball.x = Math.random() * canvas.width;
    ball.y = Math.random() * canvas.height;
    hole.x = Math.random() * canvas.width;
    hole.y = Math.random() * canvas.height;
    startTime = Date.now();
}

// Start animacji
animate();