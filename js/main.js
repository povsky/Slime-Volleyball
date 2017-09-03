
var canvas, canvasContext;

const BALL_RADIUS = 12;
const ACCEL_X = 0; 
const ACCEL_Y = 0.12;//0.38;
//const DAMPING = 0.97;
//const TRACTION = 0.95;
const DAMPING = 0.97;
const TRACTION = 0.95;
const FLOOR_THICKNESS = 70;

const HITBOX_RADIUS = SLIME_RADIUS + BALL_RADIUS;

var ballX = 100;
var ballY = 200;
var ballSpeedX = 1;
var ballSpeedY = 0;

var bottomLimit;
var leftLimit;
var rightLimit;
var upperLimit;

var redSlime = new slimeClass;
var whiteSlime = new slimeClass;

	
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
	whiteSlime.reset("White Slime","white");
	
	whiteSlime.x = 500;
	redSlime.speedY = -5;
	whiteSlime.speedY = -5;
	
	var framesPerSecond = 120;
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

function calcSlimeAngle(whichSlime) {
	
	var xDiff = (whichSlime.x - ballX);
	var yDiff = (whichSlime.y - ballY);
	
	var angle = -Math.atan2(yDiff,-xDiff);
	return angle;
}

function calcCollisionPointSlime(whichSlime) {
		

		var angle = calcSlimeAngle(whichSlime);
		console.log(angle*180/Math.PI);
		
		var prevBallX = ballX - ballSpeedX;
		var prevBallY = ballY - ballSpeedY;
		var intBallX = ballX;
		var intBallY = ballY;
		
		ballX = HITBOX_RADIUS*Math.cos(angle) + whichSlime.x;
		ballY = HITBOX_RADIUS*Math.sin(angle) + whichSlime.y;
		
		var ratioX = (ballX - prevBallX)/(intBallX - prevBallX + 0.00001);
		var ratioY = (ballY - prevBallY)/(intBallY - prevBallY + 0.00001);
		
		console.log(ratioX);
		
		ballSpeedX += ratioX*ACCEL_X;
		ballSpeedY += ratioY*ACCEL_Y;
		
		//console.log(ballX+","+ballY);
		
}

function calcSlimeBounce(whichSlime) {
	
	var N = new Array(2);
	var V = new Array(2);
	var R = new Array(2);
	
	var angle = calcSlimeAngle(whichSlime);
	
	N[0] = Math.cos(angle);
	N[1] = Math.sin(angle);
	V[0] = ballSpeedX;
	V[1] = ballSpeedY;
	
	console.log(V)
	
	var vDotN = dot(V[0],V[1],N[0],N[1]);
	
	R[0] = TRACTION*(-2*vDotN*N[0]) + V[0];// + whichSlime.speedX;
	R[1] = DAMPING*(-2*vDotN*N[1]) + V[1];// + whichSlime.speedY;
	
	ballSpeedX = R[0];
	ballSpeedY = R[1];
	
	if(Math.abs(ballSpeedX) > 20) {
		ballSpeedX = Math.sign(ballSpeedX)*20;
	}
	if(Math.abs(ballSpeedY) > 20) {
		ballSpeedY = Math.sign(ballSpeedY)*20;
	}
	
	//console.log(N);
	
	
	
}

function ballSlimeHandling(whichSlime) {

	var diag = ((whichSlime.x - ballX)*(whichSlime.x - ballX)) +
				((whichSlime.y - ballY)*(whichSlime.y - ballY))
	
	if(diag <= HITBOX_RADIUS*HITBOX_RADIUS && ballY < whichSlime.y) {
		
		calcCollisionPointSlime(whichSlime);
		calcSlimeBounce(whichSlime);
		
		
		
	}
	
	
}

function ballWallHandling() {
		
	if(ballY >= bottomLimit) {
		
		var prevBallY = ballY - ballSpeedY;
		var prevBallX = ballX - ballSpeedX;
		var ratio = calcRatio(bottomLimit, prevBallY, ballY);
		calcBallBounce(ratio, prevBallX, prevBallY, TRACTION, -1*DAMPING);		
	
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
	
	ballSlimeHandling(redSlime);
	ballSlimeHandling(whiteSlime);
	
	ballVelocityIterate();
	
}

function moveAll() {
	
	moveBall();
	redSlime.move();
	whiteSlime.move();
	
}

function drawBall() {
	colorCircle(ballX,ballY,BALL_RADIUS,'yellow');
}

function drawAll() {

	
	drawBall();
	redSlime.draw();
	whiteSlime.draw();
	
}

function dot(a1, a2, b1, b2) {

	return a1*b1 + a2*b2;

}

function cross(a1, a2, b1, b2) {

	var out = new Array[2];
	out =  [ a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1 ];
	return out;

}