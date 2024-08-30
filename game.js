let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let isGameStarted = false;
let gamePattern = [];
let userClickedPattern = [];

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function pressBtn(name) {
    playSound(name);

    $("#" + name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

function gameOver() {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    resetGame();
}

function resetGame() {
    level = 0;
    isGameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}

function nextSequence() {
    level++;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    pressBtn(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (
        gamePattern[currentLevel - 1] === userClickedPattern[currentLevel - 1]
    ) {
        if (currentLevel < level) return;

        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        gameOver();
    }
}

$(document).on("keypress", function () {
    if (isGameStarted) return;

    isGameStarted = true;
    $("#level-title").text("Level " + level);
    nextSequence();
});

$(".btn").on("click", function () {
    if (!isGameStarted) return;

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    pressBtn(userChosenColour);

    checkAnswer(userClickedPattern.length);
});
