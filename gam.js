var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;
$(document).keydown(function () {
    if (start===false) {
        nextSequence();
    }
})
function nextSequence() {
    level++;
    $("h1").text("level "+level);
    start=true;
   var randomNumber=Math.floor(Math.random()*4);
   var randomChosenColour=buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   userClickedPattern=[];
}
$(".btn").click(function () {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})
function playSound(name) {
    new Audio ("sounds/"+name+".mp3").play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        const audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
}
function startOver() {
    level=0;
    gamePattern=[];
    start=false;
}