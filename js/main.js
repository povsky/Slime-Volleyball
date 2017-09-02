
var canvas, canvasContext;

const BALL_RADIUS = 12;
const ACCEL_X = 0; 
const ACCEL_Y = 0.5;//0.38;
//const DAMPING = 0.97;
//const TRACTION = 0.95;
const DAMPING = 1;
const TRACTION = 1;
const FLOOR_THICKNESS = 70;

var ballX = 100;
var ballY = 200;
var ballSpeedX = 0;
var ballSpeedY = -1;

var bottomLimit;
var leftLimit;
var rightLimit;
var upperLimit;

var redSlime = new slimeClass;

	
window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	startGame();
	
}

function setAreaLimits() {
	bottomLimit = canvas.height - FLOOR_THICKNESS - BALL_RADIUS;
	leftLimit = 0 + BALL_RADIUS;
	rightLimit = canvas.width - BALL_RADIUS;
	upperLimit = 0 + BALL_RADIUS;
}

function startGame() {
	
	setAreaLimits();
	redSlime.reset("Red Slime","red");
	
	var framesPerSecond = 60;
	setInterval(updateAll,1000/framesPerSecond);
	
	setupInput();
	
}

function clearCanvas() {
	
	colorRect(0,0,canvas.width,canvas.height,'BLUE');
	colorRect(0,canvas.height - FLOOR_THICKNESS,canvas.width,FLOOR_THICKNESS,'grey');
}

function updateAll(){
	
	clearCanvas();
	
	moveAll();
	
	drawAll();
	

}

function calcBallBounce(ratio, prevBallX, prevBallY, xFactor,yFactor) {
		
	ballX = ballSpeedX*ratio + prevBallX;
	ballY = ballSpeedY*ratio + prevBallY;
		
	ballSpeedX = ACCEL_X*ratio + ballSpeedX;
	ballSpeedY = ACCEL_Y*ratio + ballSpeedY;
		
	ballSpeedX *= xFactor;
	ballSpeedY *= yFactor;
	
}

function calcRatio(limit, prevZ, currZ) {
	var ratio = (limit - prevZ)/(currZ - prevZ);
	return ratio;
}

function ballPositionIterate() {
	
	ballX += ballSpeedX;
	ballY += ballSpeedY;
}

function ballVelocityIterate() {

	ballSpeedX += ACCEL_X;
	ballSpeedY += ACCEL_Y;
}

function ballWallHandling() {
		
	if(ballY >= bottomLimit) {
		
		var prevBallY = ballY - ballSpeedY;
		var prevBallX = ballX - ballSpeedX;
		//var ratio = calcRatio(bottomLimit, prevBallY, ballY);
		//calcBallBounce(ratio, prevBallX, prevBallY, TRACTION, -1*DAMPING);		

		
		
		
		
		
	}else if(ballY <= upperLimit) {
		
		var prevBallY = ballY - ballSpeedY;
		var prevBallX = ballX - ballSpeedX;
		var ratio = calcRatio(upperLimit, prevBallY, ballY);
		calcBallBounce(ratio, prevBallX, prevBallY, TRACTION, -1*DAMPING);		
		
	}
	if(ballX <= leftLimit) {
		
		var prevBallY = ballY - ballSpeedY;
		var prevBallX = ballX - ballSpeedX;
		var ratio = calcRatio(leftLimit, prevBallX, ballX);
		calcBallBounce(ratio, prevBallX, prevBallY, -1*DAMPING, TRACTION);	
		
	}else if(ballX >= rightLimit) {
		
		var prevBallY = ballY - ballSpeedY;
		var prevBallX = ballX - ballSpeedX;
		var ratio = calcRatio(rightLimit, prevBallX, ballX);
		calcBallBounce(ratio, prevBallX, prevBallY, -1*DAMPING, TRACTION);	
		
	}
	
}

function moveBall() {
	
	ballPositionIterate();
	ballWallHandling();
	ballVelocityIterate();
	
}

function moveAll() {
	
	moveBall();
	redSlime.move();
	
}

function drawBall() {
	colorCircle(ballX,ballY,BALL_RADIUS,'yellow');
}

function drawAll() {

	
	drawBall();
	redSlime.draw();
	
}

function dot(a1, a2, b1, b2) {

	return a1*b1 + a2*b2;

}

function cross(a1, a2, b1, b2) {

	var out = new Array[2];
	out =  [ a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1 ];
	return out;

}