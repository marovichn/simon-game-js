var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").on("click", function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(event.target.id);
  animatePress(event.target.id);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(100)
    .fadeOut(200)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(trigger) {
  var buttonSound = new Audio("./sounds/" + trigger + ".mp3");
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    $("body").addClass("game-over");
    var gameOverSound = new Audio("./sounds/wrong.mp3");
    gameOverSound.play();
    if (level > 0) {
      var score = level - 1;
    } else {
      var score = 0;
    }

    $("#level-title").html("WRONG!!!<br>Your score is " + score);
    startOver();
  }
}
$(".reload1").on("click", function () {
  $("body").removeClass("game-over");
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".reload").on("click", function () {
  window.location.reload();
});
