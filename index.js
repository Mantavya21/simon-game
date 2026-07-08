
var level=0;
var started=0;

var gamePattern=[];
var userClickPattern=[]
var currentColor=0;

var buttonColors=["red","blue","green","yellow"];


function nextSequence()
{
    var randomNumber=Math.floor(4*Math.random());
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).animate({ opacity: 0.3 }, 100).animate({ opacity: 1.0 },100);
    playSound(randomChosenColor);

    level++;
    $("h1").text("level "+level);
}

function playSound(name)
{
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    if(level>=1)
    {
        userChosenColor=$(this).attr("id");
        userClickPattern.push(userChosenColor);
        $("#"+userChosenColor).addClass("pressed");
        setTimeout(function(){
            $("#"+userChosenColor).removeClass("pressed");
        },100);
        playSound(userChosenColor);
        checkAnswer(userClickPattern.length-1);
    }
});

$(document).keypress(function(){
    if(level==0)
    {
        nextSequence();
    }
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickPattern[currentLevel])
    {
        console.log("correct");
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over,Press Any Key to Restart");
        level=0;
        started=0;
        gamePattern=[];
        userClickPattern=[];
    }
    if(currentLevel+1==gamePattern.length)
    {
        userClickPattern=[];
        setTimeout(nextSequence,1000);
    }
}
