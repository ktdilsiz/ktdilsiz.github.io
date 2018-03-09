var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var dx = 2.0;
var dy = -2.0;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var bricks = [];

for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, hit: false };
    }
}

function drawBricks(){
    for(i=0; i < brickColumnCount; i++){
        for(j=0; j < brickRowCount; j++){
            var b = bricks[i][j];
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (j*(brickHeight+brickPadding))+brickOffsetTop;
            b.x = brickX;
            b.y = brickY;
            
            if(!b.hit){
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.hit){
                
            }
            else if(x + ballRadius > b.x && x - ballRadius < b.x+brickWidth && y + ballRadius > b.y && y - ballRadius < b.y+brickHeight) {
                
                if(x + ballRadius > b.x + 1 && x - ballRadius < b.x+brickWidth - 1)
                    dy = -dy;
                else{
                    dx = -dx;
                }

                score++;
                b.hit = true;
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function draw() {

    if(score == 15){
        alert("YOU WIN");
        document.location.reload();
    }
    // drawing code
    //drawing the ball
    if(x > canvas.width - ballRadius || x < ballRadius){
        dx = -dx;
    }
    if(y > canvas.height - ballRadius || y < ballRadius){
        dy = -dy;
    }

    if(y + ballRadius > canvas.height - ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dx = 1.2*dx;
            dy = -1.2*dy;
        }else{
            alert("GAME OVER");
            document.location.reload();
        }
    }
    collisionDetection();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBall();
    drawBricks();
    x += dx;
    y += dy;

    //drawing the paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    drawPaddle();

}
setInterval(draw, 20);

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function test(){
    ctx.beginPath();
    ctx.arc(canvas.width-x, canvas.height-y, 2*ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}