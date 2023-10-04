/* COLORS */
const colorPayer1 = 'blue';
const colorPayer2 = 'red';
/* VALUES */
const netInterval = 5;
const ballRadius = 9;
const netWidth = 2;
const framePerSecond = 50;
const computerLevel = 0.1;


/* SELECT CANVAS */
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

/* USER PADDLE */

const user = {
    x: 0,
    y: canvas.clientHeight/2 - 100/2,
    width: 10,
    height: 100,
    color: colorPayer1,
    score: 0
}

/* COMPUTER PADDLE */

const com = {
    x: canvas.width - 10,
    y: canvas.clientHeight/2 - 100/2,
    width: 10,
    height: 100,
    color: colorPayer2,
    score: 0
}

/* BALL */

const ball = {
    x: canvas.width/2,
    y: canvas.clientHeight/2,
    radius: ballRadius,
    speed: 5,
    color: "white",
    velocityX: 5,
    velocityY: 5
}

/* DRAW RECT */

function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

/* CREATE THE NET */

const net = {
    x: canvas.width/2 - netWidth/2,
    y: 0,
    width: netWidth,
    height: netInterval,
    color: "white"
}

/* DRAW NET */
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=netInterval+2){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
/* DRAW CIRCLE */

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

//drawCircle(100, 100, 50, "white");

/* DRAW TEXT */

function drawText(text, x, y, color){
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, x, y);
}
//drawText("something", 300, 200, "white");


/* RENDER THE GAME */
function render(){
    //clear canvas
    drawRect(0, 0, canvas.clientWidth, canvas.clientHeight, "green");

    drawNet();
    //draw score
    drawText(user.score, canvas.width/4, canvas.height/5, colorPayer1);
    drawText(com.score, (3 * canvas.width/4), canvas.height/5, colorPayer2);
    //draw paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    //draw ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

}

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
    let rect = canvas.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}

function collision(ball, paddle){
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddle.height;
    paddle.left = paddle.x;
    paddle.right = paddle.x + paddle.width;
    //returns true or fance for the collision
    return ball.right > paddle.left
        && ball.bottom > paddle.top
        && ball.left < paddle.right
        && ball.top < paddle.bottom;
}
/* BALL RESET */
function resetBall(){
    /* ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 5;
    ball.velocityY = -ball.velocityY; */
    //ball.velocityX = -ball.velocityX;
    
}

/* UPDATE GAME  */
function gameUpdate(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    ///AI
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < canvas.width/2) ? user : com;

    if (collision( ball, player)){
        //where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2);
        //normalization
        collidePoint = collidePoint/(player.height/2);

        //calculate angle in Radian
        let angleRad = collidePoint * Math.PI/4;

        // X direction of the ball when it's hit
        let direction = (ball.x < canvas.width/2) ? 1 : -1;

        //change velocity X an y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction *ball.speed * Math.sin(angleRad);

        ball.speed += 0.1;
    }

    if(ball.x - ball.radius < 0) com.score++;
    if(ball.x - ball.radius > canvas.width) com.score++;

    resetBall();

}
function game(){
    gameUpdate();
    render();
}

/* LOOP */
setInterval(game, 1000/framePerSecond);