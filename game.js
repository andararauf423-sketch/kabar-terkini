const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5
};

const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update ball position
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // Ball collision with paddle
    if (ball.y + ball.radius > paddle.y && ball.y - ball.radius < paddle.y + paddle.height && ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width) {
        ball.speedY = -ball.speedY;
    }

    // Draw ball and paddle
    drawBall();
    drawPaddle();
}

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    paddle.x = event.clientX - rect.left - paddle.width / 2;
}

canvas.addEventListener('mousemove', movePaddle);

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
