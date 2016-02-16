$( document ).ready(function() {

var lettersGuessed = [];	// array for letters guessed
var userInput; 						// gather user input for letter guessed
var stickArray; 					// array for stick figure parts
var genWord;							// generate word from array
var correct;							// count amount of correct guesses
var userTries = 6;				// how many tries the user is allowed
var space = 2;								// store spaces in generated word
// ************** HANGMAN FIGURE ***************** //
// use strokestyle() to change color
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var paint = function(move1, move2, line1, line2) {
  ctx.beginPath();
  ctx.moveTo(move1, move2);
  ctx.lineTo(line1, line2);
  ctx.strokeStyle="#006666";
  ctx.stroke();
}

var baseStand = function() {
  //bottom
  paint(40, 250, 40, 40);
  paint(200, 250, 40, 250);
  //top
  paint(40, 40, 120, 40);
  paint(120, 60, 120, 40)
}

var stickHead = function() {
  ctx.beginPath(); //head
  ctx.arc(120, 75, 15, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath(); //left eye
  ctx.arc(112, 72, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath(); //right eye
  ctx.arc(125, 72, 2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath(); //smile
  ctx.arc(119, 79, 5, 0, Math.PI * 1);
  ctx.stroke();
}

var stickBody = function() {
  paint(120, 200, 120, 90);
}

var rightArm = function() {
  paint(150, 150, 120, 120);
}

var leftArm = function() {
  paint(120, 120, 80, 140);
}

var leftLeg = function() {
  paint(120, 200, 100, 230);
}

var rightLeg = function() {
  paint(120, 200, 140, 230);
}
//create array for body parts
stickArray = [rightLeg, leftLeg, leftArm, rightArm, stickBody, stickHead, baseStand];

//********* WORD BANK AND USER INPUT ************* //
  function wordBank() {
  var storeWords1 = ["THE ", "ALL ", "THIS ", "HELLO ", "GOODBYE "];
  var storeWords2 = ["GREEN ", "RED ", "BLUE ", "WHITE ", "GRAY "];
  var storeWords3 = ["MANGO", "BANANA", "KIWI", "STRAWBERRY", "SMOOTHIE"]

  var words = storeWords1[Math.floor(Math.random() * 4)] +
    storeWords2[Math.floor(Math.random() * 4)] +
    storeWords3[Math.floor(Math.random() * 4)];

  return words;
}
genWord = wordBank();
//gather user input 
$( "#clickGuess" ).click(function() {
  var userInput = $( "#inputLetter" ).val();
  
  if(userInput === "") { //*** DON'T RUN IF LETTER IS NULL || " " ***
  	alert("Please enter a letter");
    $("input[type=text]").val("");
    } else if(lettersGuessed.indexOf(userInput) !== -1) {
    alert("Please enter a letter not already used");
    $("input[type=text]").val("");
    } else { //*****ONLY RUN IF USER ENTERS LETTER UPON CLICK ******
    
  lettersGuessed.push(userInput);
  
	console.log(lettersGuessed);
  
  console.log(userInput);
  console.log(genWord);

  if(genWord.indexOf(userInput) !== -1) {
  console.log("true");
  correct += 1;
  } else {
   console.log("false");
   stickArray[userTries]();
   userTries--;
   console.log(userTries);
  }
  //** GAME WON **
  if( (genWord.length - space) === correct) {
  //do something
  }
  //** GAME OVER **
  if(userTries === -1) {
  console.log("GAMVE OVER");
  }
   $( "#showLetters" ).append( userInput);//misguessed letters are being placed here
	 $("input[type=text]").val("");
	//*** IMPLEMENT RESET **** 


  }// ******** ENDS ELSE STATEMENT ************
});// ***ENDS CLICK ***

function blinker() {

  if ($('input[type=text]').attr('placeholder')) {
    // get the placeholder text
    $('input[type=text]').attr('placeholder', '');
  } else {
    $('input[type=text]').attr('placeholder', 'A');
  }

  setTimeout(blinker, 1000);

}
blinker();
}); //***** END ALL *****