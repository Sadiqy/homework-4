function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

let stopWatch = 60;


Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        stopWatch += 10;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
//
let timeEl = document.querySelector(".time");

let timerInterval = setInterval(function() {
    stopWatch--;
    timeEl.textContent = stopWatch + " seconds left.";
    if(stopWatch === 0) {
        clearInterval(timerInterval);
        showScores();
        addPersonToList();
      }
}, 1000);


function setTime() {
    timerInterval;

}
//
function populate() {
    if(quiz.isEnded()) {
        showScores();
        addPersonToList();
        //incorporate the name signing thing into show scores function?
    }
    else {
        // show question
        let element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
        setTime();
    }
};

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};


let scoresheet = document.querySelector("#scoresheet")
let progress = document.querySelector("#progress")


function showScores() {
    scoresheet.classList.remove("hide");
    let gameOverHTML = "<h1>Score</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + " correct out of 5!</h2>";
    let element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    keyEventsEl.classList.remove(".hide");
    progress.classList.add(".hide");
    //Add score addition form)
};


function addPersonToList(event) {
  event.preventDefault();
  let name = nameEl.value;
  let li = document.createElement("li");
  li.id = people.length;
  li.innerHTML = name + " got " + quiz.score + " correct out of 5.";
  people.push({ name: name });
  peopleListEl.append(li);
}

let addBtn = document.querySelector('#add-btn');
let nameEl = document.querySelector("#name");
let peopleListEl = document.querySelector("#people-list");
let modalEl = document.querySelector("#modal-container");
let modalNameEl = document.querySelector("#modal-name");
let descriptionEl = document.querySelector("#description");
let closeEl = document.querySelector(".close");


addBtn.addEventListener("click", addPersonToList);


let people = [{ name:"" }];



// create questions here
let questions = [
    new Question("How many castles are on the Wall?", ["Seven", "Eleven","Nineteen", "ten"], "Nineteen"),
    new Question("How many times did Tyrion stand trial?", ["only once", "Three times", "Twice", "Never"], "Three times"),
    new Question("What is the name of Rickon Stark's direwolf?", ["Shaggy Dog", "Grey Wind","Snow Wolf", "Wild Ice"], "Shaggy Dog"),
    new Question("How many castles on the Wall are actually manned?", ["One, Castle Black", "Three", "Two, Castle Black and East Watch by the sea", "Five"], "Three"),
    new Question("What is the name of Samwell Tarly's younger brother?", ["Rickon", "Willis", "Dickon", "Beric"], "Dickon")
];

// create quiz
let quiz = new Quiz(questions);

// display quiz
populate();