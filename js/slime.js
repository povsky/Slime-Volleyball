
const SLIME_RADIUS = 40;
const SLIME_SPEED = 1;
const JUMP_HEIGHT = 100;
const SLIME_ACCEL_Y = 0.5;
const SLIME_START_X = 100;
const SLIME_SPEED_X = 5;
const SLIME_SPEED_Y = 10;

const SLIME_EYE_RADIUS = 5;
const SLIME_PUPIL_RADIUS = 2;

function slimeClass() {
	
	this.x = SLIME_START_X;
	this.y = 200;
	this.speedX = 0;
	this.speedY = 0;
	this.name = "Slime";
	this.color = "green";
	
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;
	this.keyHeld_Jump = false;
	
	this.controlKeyRight;
	this.controlKeyLeft;
	this.controlKeyJump;
	
	this.setupInput = function(rightKey, leftKey, jumpKey) {
		
		this.controlKeyRight = rightKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyJump = jumpKey;
		
	}
	
	this.reset = function(slimeName,color) {
		
		this.x = SLIME_START_X;
		this.y = canvas.height - FLOOR_THICKNESS;
		this.speedX = 1;
		this.speedY = 0;
		this.name = slimeName;
		this.color = color;
		
	}
	
	
	this.move = function() {
		
/*		if(this.keyHeld_Right) {
			this.speedX = SLIME_SPEED_X;
		}else {
			this.speedX = 0;
		}
		if(this.keyHeld_Left) {
			this.speedX = -SLIME_SPEED_X;
		}else {
			this.speedX = 0;
		}
		if(this.keyHeld_Jump) { 
			if(this.y > canvas.height - FLOOR_THICKNESS ) {
				this.speedY = SLIME_SPEED_Y;
			}
		} */
	
		
		this.x += this.speedX;
		this.y += this.speedY;		
		this.speedY += SLIME_ACCEL_Y;
		
		if(this.y > canvas.height - FLOOR_THICKNESS - 0.1){	
			this.y = canvas.height - FLOOR_THICKNESS;
			this.speedY = 0;	
		}
		
		
	}
	
	this.draw = function() {
		
		canvasContext.fillStyle = this.color;
		canvasContext.beginPath();
		canvasContext.arc(this.x,this.y,SLIME_RADIUS,0,Math.PI,true);
		canvasContext.fill();
		
	}
	
	
}