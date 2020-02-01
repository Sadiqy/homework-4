const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");

const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

const progress =  document.getElementById("progress");
const scoreContainer =  document.getElementById("scoreContainer");

let questions = [
    {
        question : "How many castles are on the Wall?",

        choiceA : "Seven",
        
        choiceB : "Eleven",
        
        choiceC : "Nineteen",

        correct: "C"

    },
    {
        question : "How many times did Tyrion stand trial?",

        choiceA : "Only once",
        
        choiceB : "Three times",
        
        choiceC : "Twice",

        correct: "B"

    },
    {
        question : "What is the name of Rickon Stark's direwolf?",

        choiceA : "Shaggy Dog",
        
        choiceB : "Grey Wind",
        
        choiceC : "Snow Wolf",

        correct: "A"

    },
    {
        question : "How many castles on the Wall are actually manned?",

        choiceA : "One, Castle Black",
        
        choiceB : "Three",
        
        choiceC : "Two, Castle Black and East Watch by the sea",

        correct: "B"

    },
];

let lastQuestionIndex = questions.length - 1;
let currentQuestionIndex = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }

}

function renderQuestion (){

    let q = question[runningQuestionIndex];
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestionIndex; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(currentQuestionIndex).style.backgroundColor = "green";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(currentQuestionIndex).style.backgroundColor = "red";
}

//counter render