
const SLIME_RADIUS = 40;
const JUMP_HEIGHT = 100;
const SLIME_ACCEL_Y = 0.75;
const SLIME_START_X = 200;
const SLIME_SPEED_X = 5;
const SLIME_SPEED_Y = 12;

const SLIME_EYE_RADIUS = 6;
const SLIME_PUPIL_RADIUS = 4;

function slimeClass() {
	
	this.x = SLIME_START_X;
	this.y = 200;
	this.speedX = 0;
	this.speedY = 0;
	this.name = "Slime";
	this.color = "green";
	this.side = true;
	
	this.rightLimit = 0;
	this.leftLimit = 0 + SLIME_RADIUS;
	
	this.keyHeld_Right = false;
	this.keyHeld_Left = false;
	this.keyHeld_Up= false;
	
	this.controlKeyRight;
	this.controlKeyLeft;
	this.controlKeyUp;
	
	this.setupInput = function(rightKey, leftKey, upKey) {
		
		this.controlKeyRight = rightKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyUp = upKey;
		
	}
	
	this.reset = function(slimeName,color,side) {
		
		this.side = side;
		this.x = SLIME_START_X;
		this.y = canvas.height - FLOOR_THICKNESS;
		this.speedX = 0;
		this.speedY = 0;
		this.name = slimeName;
		this.color = color;
		
	}
	
	
	this.move = function() {
		
		if(this.keyHeld_Right) {
			this.speedX = SLIME_SPEED_X;
			//console.log("RIGHT KEY HELD");
		}
		if(this.keyHeld_Left) {
			this.speedX = -1*SLIME_SPEED_X;
			//console.log("LEFT KEY HELD");
		}
		if(this.keyHeld_Left == this.keyHeld_Right) {
			this.speedX = 0;
		}
		
		if(this.keyHeld_Up) { 
			//console.log("UP KEY HELD"+this.y);
			if(this.y > canvas.height - FLOOR_THICKNESS - 0.0001) {
				this.speedY = -SLIME_SPEED_Y;
			}
		}
	
		
		this.x += this.speedX;
		this.y += this.speedY;		
		this.speedY += SLIME_ACCEL_Y;
		
		this.calcXLimits();
		
		if(this.x < this.leftLimit) {
			this.x = this.leftLimit;
		}else if(this.x > this.rightLimit) {
			this.x = this.rightLimit;
		}
		
		if(this.y > canvas.height - FLOOR_THICKNESS){	
			this.y = canvas.height - FLOOR_THICKNESS;
			this.speedY = 0;	
		}
		
		
	}
	
	this.draw = function() {
		
		canvasContext.fillStyle = this.color;
		canvasContext.beginPath();
		canvasContext.arc(this.x,this.y,SLIME_RADIUS,0,Math.PI,true);
		canvasContext.fill();
		
		var eyeX = SLIME_RADIUS*0.6;
		var angle = calcSlimeAngle(this);
		var eyeOffset = SLIME_EYE_RADIUS - SLIME_PUPIL_RADIUS;
		var centerX = Math.cos(angle)*eyeOffset;
		var centerY = Math.sin(angle)*eyeOffset;
		
		
		if(this.x <= canvas.width/2) {
			eyeX *= 1;
		}else {
			eyeX *= -1;
		}
		
		colorCircle(this.x + eyeX,this.y - SLIME_RADIUS*0.3,SLIME_EYE_RADIUS,"white");
		
		colorCircle(this.x + eyeX + centerX, this.y - SLIME_RADIUS*0.3 + centerY,
						SLIME_PUPIL_RADIUS, "black");
		
		
		
	}
	
	this.calcXLimits = function() {
		
		if(this.side) {
			this.leftLimit = 0 + SLIME_RADIUS;
			this.rightLimit = canvas.width/2 - SLIME_RADIUS - NET_THICKNESS/2;
		}else {
			this.leftLimit = canvas.width/2 + SLIME_RADIUS + NET_THICKNESS/2;
			this.rightLimit = canvas.width - SLIME_RADIUS;
		}
		
		
	}
	
}