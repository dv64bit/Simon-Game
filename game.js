// My Code
// var buttonColours = ["red", "blue", "green", "yellow"];
// var gamePattern = [];
// var userClickPattern = [];
// for (let i = 0; i <= 4; i++) {
//     $(".btn").click(function handler(event) {
//         // console.log(event.target.id );
//         var userChosenColour = event.target.id;
//         userClickPattern.push(userChosenColour)
//     });
//     console.log(userClickPattern);
// }
// function nextSequence() {
//     var randomNumber = Math.floor((Math.random()) * 4);
//     var randomChosenColour = buttonColours[randomNumber];
//     console.log(randomChosenColour);



//     gamePattern.push(randomChosenColour);
//     $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

//     switch (randomChosenColour) {
//         case randomChosenColour = "red":
//             var red = new Audio("sounds/red.mp3");
//             red.play()
//             break;
//         case randomChosenColour = "blue":
//             var blue = new Audio("sounds/blue.mp3");
//             blue.play()
//             break;
//         case randomChosenColour = "green":
//             var green = new Audio("sounds/green.mp3");
//             green.play()
//             break;
//         case randomChosenColour = "yellow":
//             var yellow = new Audio("sounds/yellow.mp3");
//             yellow.play()
//             break;

//         default:
//             break;
//     }
// }





// Course Code


var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level=0;
    gamePattern=[];
    started = false;
}