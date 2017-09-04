const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW =  40;
const KEY_SPACE_BAR = 32;

const KEY_A = 65;
const KEY_W = 87;
const KEY_D = 68;
const KEY_S =  83;

var keyHeld_Right;
var keyHeld_Left;
var keyHeld_Up;

var mouseX;
var mouseY;

function setupInput() {
	
	canvas.addEventListener('mousemove',updateMousePos);
	document.addEventListener('keydown',keyPressed);
	document.addEventListener('keyup',keyReleased);
	
	redSlime.setupInput(KEY_RIGHT_ARROW,KEY_LEFT_ARROW,KEY_UP_ARROW);
	whiteSlime.setupInput(KEY_D,KEY_A,KEY_W);
	

}

function updateMousePos(evt) { // Updates the global mouseX and mouse Y variables
	
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}
	
function keySet(keyEvent, whichSlime, setTo) {
	
	//console.log(keyEvent.keyCode);
	
	if(keyEvent.keyCode == whichSlime.controlKeyLeft) {
		whichSlime.keyHeld_Left = setTo;
	}
	if(keyEvent.keyCode == whichSlime.controlKeyRight) {
		whichSlime.keyHeld_Right = setTo;
	}
	if(keyEvent.keyCode == whichSlime.controlKeyUp) {
		whichSlime.keyHeld_Up = setTo;
	}
}
	
function keyPressed(evt) {
	//console.log(evt.keyCode);
	keySet(evt,redSlime,true);
	keySet(evt,whiteSlime,true);
}

function keyReleased(evt) {
	//console.log(evt.keyCode);
	keySet(evt,redSlime,false);
	keySet(evt,whiteSlime,false);

}

