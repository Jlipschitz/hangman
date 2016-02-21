$(document).ready(function() {

    var lettersGuessed = []; // array for letters guessed
    var userInput; // gather user input for letter guessed
    var stickArray; // array for stick figure parts
    var genWord; // generate word from array
    var correct = 0; // count amount of correct guesses
    var userTries = 6; // how many tries the user is allowed
    var space = 2; // store spaces in generated word
    // ************** HANGMAN FIGURE ***************** //
    // use strokestyle() to change color
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var multiL = [];


    var paint = function(move1, move2, line1, line2) {
        ctx.beginPath();
        ctx.moveTo(move1, move2);
        ctx.lineTo(line1, line2);
        ctx.strokeStyle = "#006666";
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
    var clearStick = function() { //clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        //create function array for body parts
    stickArray = [rightLeg, leftLeg, leftArm, rightArm, stickBody, stickHead, baseStand];

    //********* WORD BANK AND USER INPUT ************* //
    function wordBank() {
        var storeWords1 = ["THE ", "ALL ", "THIS ", "HELLO ", "GOODBYE "];
        var storeWords2 = ["GREEN ", "RED ", "BLUE ", "WHITE ", "GRAY "];
        var storeWords3 = ["MANGO", "BANANA", "KIWI", "STRAWBERRY", "SMOOTHIE"]

        var words = storeWords1[Math.floor(Math.random() * 5)] +
            storeWords2[Math.floor(Math.random() * 5)] +
            storeWords3[Math.floor(Math.random() * 5)];

        return words;
    }
    genWord = wordBank();

    for (var i = 0; i < genWord.length; i++) {
        $("#displayWords").append("_");
        multiL[i] = "_";
        if (genWord[i] === " ") {
            $("#displayWords").append(" ");
            multiL[i] = " ";
        }
    }

    $("#displayWords").html(multiL);
    // var wordDisplayed = $("#displayWords").html();

    //run this function if the user loses
    function fadeText() {
        $("#gameAlerts").fadeOut("slow");
        $("#gameAlerts").fadeIn("slow");
    }

    // ********** ON CLICK **********
    $("#clickGuess").click(function() {
        var userInput = $("#inputLetter").val().toUpperCase();

        // ****** ONLY ALLOW LETTERS ****
        if (userInput === "" || !isNaN(userInput / 1)) {
            $("#gameAlerts").html("ENTER A LETTER");
            $("input[type=text]").val("");
        } else if (lettersGuessed.indexOf(userInput) !== -1) {
            $("#gameAlerts").html("ALREADY USED!");
            $("input[type=text]").val("");

        } else { //*****ONLY RUN IF USER ENTERS LETTER UPON CLICK ******

            lettersGuessed.push(userInput);

            if (genWord.indexOf(userInput) !== -1) {

                for (var i = 0; i < genWord.length; i++) {
                    if (genWord[i] == userInput) {
                        multiL[i] = genWord[i];
                        correct += 1;
                        console.log(correct)
                        $("#gameAlerts").html("CORRECT!");
                        fadeText();
                    }
                } // ends for loop

            } else {
                //animate canvas if wrong
                stickArray[userTries]();
                userTries--;
                $("#gameAlerts").html("WRONG!");
                $("#gameAlerts2").html("LIVES LEFT: " + (userTries + 1));
                fadeText();
            }
            //** GAME WON **
            if ((multiL.length - space) === correct) {
                $("#gameAlerts").html("YOU WON!");
                fadeText();
            }
            //** GAME OVER **
            if (userTries === -1) {
                $("#gameAlerts").html("YOU LOST!");
                $("#displayWords").html(genWord);
                fadeText();
            }
            $("#showLetters").append(userInput); //misguessed letters are being placed here
            $("input[type=text]").val(""); //clear input letter
            if (userTries !== -1) {
                $("#displayWords").html(multiL);
            }
        } // ******** ENDS ELSE STATEMENT ************

    }); // ***ENDS CLICK GUESS***

    //*** IMPLEMENT RESET **** 
    $("#clickReset").click(function() {

        clearStick(); //clear canvas
        $("#gameAlerts").empty(); //clear messages
        $("#gameAlerts2").empty(); //clear messages
        $("#showLetters").empty(); //clear letters
        $("#displayWords").empty(); //clear word
        multiL = [];
        lettersGuessed = [];
        userTries = 6;
        correct = 0;

        //generate new word and display underscores
        genWord = wordBank();
        for (var i = 0; i < genWord.length; i++) {
            $("#displayWords").append("_");
            multiL[i] = "_";
            if (genWord[i] === " ") {
                $("#displayWords").append(" ");
                multiL[i] = " ";
            }
        }
    });
    //****** ENDS CLICK RESET ******
    //placeholder blink function

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
