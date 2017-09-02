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
var keyHeld_Space;

var mouseX;
var mouseY;

function setupInput() {
	
	canvas.addEventListener('mousemove',updateMousePos);
	document.addEventListener('keydown',keyPressed);
	document.addEventListener('keyup',keyReleased);

}

function updateMousePos(evt) { // Updates the global mouseX and mouse Y variables
	
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}
	
function keySet(keyEvent, setTo) {
	
	if(keyEvent.keyCode == KEY_LEFT_ARROW) {
		keyHeld_Left = setTo;
	}
	if(keyEvent.keyCode == KEY_RIGHT_ARROW) {
		keyHeld_Right = setTo;
	}
	if(keyEvent.keyCode == KEY_SPACE_BAR) {
		keyHeld_Space = setTo;
	}
}
	
	
function keyPressed(evt) {
	//console.log(evt.keyCode);
	keySet(evt,true);
	keySet(evt,true);
}

function keyReleased(evt) {
	//console.log(evt.keyCode);
	keySet(evt,false);
	keySet(evt,false);

}