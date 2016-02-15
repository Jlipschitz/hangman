
// ************** HANGMAN FIGURE ***************** //
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var paint = function(move1,move2,line1,line2) {
		ctx.beginPath();
    ctx.moveTo(move1, move2);
    ctx.lineTo(line1, line2);
    ctx.stroke(); 
} 

var baseStand = function() {
paint(40,250,40,40);
paint(200,250,40,250);
paint(40,40,120,40);
paint(120,60,120,40)
}
baseStand();

var head = function() {
ctx.beginPath();//head
ctx.arc(120,75,15,0,Math.PI * 2);
ctx.stroke();
ctx.beginPath();//left eye
ctx.arc(112,72,2,0,Math.PI * 2);
ctx.stroke();
ctx.beginPath();//right eye
ctx.arc(125,72,2,0,Math.PI * 2);
ctx.stroke();
ctx.beginPath();//smile
ctx.arc(119,79,5,0,Math.PI * 1);
ctx.stroke();
}
head();


//********* WORD BANK AND USER INPUT ************* //
function promptHang() {
	var userInput = prompt("Please guess a letter");
}

	function wordBank() {
	var storeWords1 = ["THE ", "ALL ", "THIS ", "HELLO ", "GOODBYE "];
	var storeWords2 = ["GREEN ", "RED ", "BLUE ", "WHITE ", "GRAY ",];
	var storeWords3 = ["MANGO", "BANANA", "KIWI", "STRAWBERRY", "SMOOTHIE"]

	var words = storeWords1[Math.floor(Math.random() * 4)] +
				storeWords2[Math.floor(Math.random() * 4)] +
				storeWords3[Math.floor(Math.random() * 4)];

	return words;
}
console.log(wordBank());