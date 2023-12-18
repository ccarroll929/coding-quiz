// Gathering the required HTML elements

let quizInfo = document.querySelector('.quiz-info')
let quizBox = document.querySelector('.quiz-box');
let resultsBox = document.querySelector('.results-box');
let questionList = document.getElementById('questions');
// let choiceList = document.querySelector('.choices');
let answerEl = document.querySelectorAll('.answer')
let questionElement = document.getElementById('question-number');
let choiceBoxes = document.getElementById('choiceBoxes')
let timerEl = document.getElementById('countdown'); 
let timeLeft = 90;


let aText = document.getElementById('a-text');
let bText = document.getElementById('b-text');
let cText = document.getElementById('c-text');
let dText = document.getElementById('d-text');

//Buttons
let startBtn = document.getElementById('start-quiz');
let nextBtn = document.getElementById('next-question');
let submitBtn = document.getElementById('submit-button');
let tryAgain = document.getElementById('restart');


// Score variables 
let highScoreEl = document.querySelector('.high-score');
let questionCount = 0; 
let userScore = 0; 
let mostRecentScore = localStorage.getItem("mostRecentScore");
let high_scores = 'highScores'; 
let highScoreString = localStorage.getItem("high_scores");
let highScores = JSON.parse(localStorage.getItem("highScoreString")) ?? [];
let maxHighScore = 1; 



// Creating an object with arrays for the questions and answers 
let questions = [
    {   number: 1,
        question: "1. In JavaScript, what is used to determine whether code should be run or not based on one or more possible scenarios?",
        correct: "c", 
        a: "Binary Statement",
        b: "Variable Expression",
        c: "Conditional Statements",
        d: "Trigger Events",
        penaltyTime: -5, 
    },
    {   number: 2,
        question: "2. What is used to compare values inside variables and returns a 'true' or 'false' value?",
        correct: "a", 
        a: "Comparison and Logical Operators",
        b: "Math()",
        c: "Boolean Test",
        d: "Function",
        penaltyTime: -5,
    },

    {   number: 3,
        question: "3. In JavaScript, what is the name of the object that performs mathematical operations with variable inputs?",
        correct: "c",
        a: "Calculate.",
        b: "Logical Operator",
        c: "Math.",
        d: "Solve.",
        penaltyTime: -5,
    },
    {   number: 4,
        question: "4. Which scope contains all the variables and code that will be read and executed by default?",
        correct: "b", 
        a: "Major Scope",
        b: "Global Scope",
        c: "Local Scope",
        d: "Minor Scope",
        penaltyTime: -5,
    },
    {   number: 5,
        question: "5. Which scope contains variables that can only be accessed inside a function ",
        correct: "a", 
        a: "Local Scope",
        b: "Minor Scope",
        c: "Major Scope",
        d: "Global Scope",
        penaltyTime: -5,
    },
    {   number: 6,
        question: "6. In JavaScript, what is a block of code that can be called upon to perform a specific task?",
        correct: "d", 
        a: "For Loop",
        b: "Conditional Statement",
        c: "Else Loop",
        d: "Function",
        penaltyTime: -5,
    },

    {
        number: 7,
        question: "7. In JavaScript, what is used to store multiple values inside one variable?",
        correct: "c", 
        a: "Object",
        b: "Const",
        c: "Array",
        d: "Let",
        penaltyTime: -5,
    },
    {
        number: 8,
        question: "8. In JavaScript, what is used to store multiple variables with their own set of values inside a single variable?",
        correct: "a",
        a: "Object",
        b: "String",
        c: "Function",
        d: "Array",
        penaltyTime: -5,
    },
    {
        number: 9,
        question: "9. In JavaScript, what is used to repeatedly execute a block of code as long as certain conditions are met?",
        correct: "d",
        a: "Else Loop",
        b: "Conditional Statement",
        c: "Function",
        d: "For Loop",
        penaltyTime: -5,
    },
    {
        number: 10,
        question: "10. In JavaScript, what is used to execute a function when a user interacts with an HTML element?",
        correct: "a",
        a: "Event",
        b: "Button",
        c: "Link",
        d: "Script",
        penaltyTime: -5,
    },
]

// Creating function to display quizBox on button click
function displayQuizBox() {
    quizBox.style.display="block"; 
}
function displayQuestions(){

    deselectAnswers();
    let currentQuestion = questions[questionCount];

    questionElement.innerText = currentQuestion.question
    aText.innerText = currentQuestion.a
    bText.innerText = currentQuestion.b
    cText.innerText = currentQuestion.c
    dText.innerText = currentQuestion.d
    }

    function deselectAnswers() {
        answerEl.forEach(answerEl => answerEl.checked = false) 
    }

    function getSelected() {
        answerEl.forEach(answerEl => {
            if(answerEl.checked) {
            userInput = answerEl.id
            }
        })
        return userInput
    }
    

    nextBtn.addEventListener('click', () => {
        console.log("You clicked the next button");
         userInput = getSelected()
         if(userInput) {
            if(userInput === questions[questionCount].correct) {
            userScore+=10 
            }
        else {
            timeLeft = timeLeft-=5; 
            timerEl.textContent = timeLeft + ' seconds left';
        }
            timeLeft--;
            questionCount++ 
        if(questionCount < questions.length) {
                displayQuestions()
            } 
        else {
            resultsBox.style.display="block";
            nextBtn.style.display="none";
            mostRecentScore = userScore; 
            highestScore();
            saveHighScore();
            resultsBox.innerHTML = ` 
            <div class=".results-box">You scored ${mostRecentScore}/100 points<br>
            <button onclick="location.reload()">Reload</button></div>
            <div class=".high-score">High Score: ${localStorage.getItem(high_scores, JSON.stringify(highScores))}</div>
            `
              }
                        }
});

//Store highest score
function highestScore () {
    let highScores = JSON.parse(localStorage.getItem(high_scores)) ?? [];
if (mostRecentScore > userScore) {
    saveHighScore(); 
    console.log("Local Storage:" + localStorage.getItem(high_scores, JSON.stringify(highScores)))
  
}
}

function saveHighScore() {
    highScores.push(mostRecentScore);
    highScores.sort((a, b) => b.mostRecentScorescore - a.mostRecentScorescore);
    highScores.splice(1);
    localStorage.setItem(high_scores, JSON.stringify(highScores))
}




// Function to start timer
function countdown() {
    var timeLeft = 90;
    let timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds left';
            timeLeft--; 
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second left';
            timeLeft--; 
        } else {
            clearInterval(timeInterval);
            displayResults(); 
        }
    }, 1000);
}



// Adding an event listener for the start button 
startBtn.addEventListener("click", function(event){
    event.preventDefault(); 
    quizInfo.style.display="none";
    startBtn.style.display="none";
    questionCount = 0;
    console.log("You clicked the start button"); 
    displayQuizBox();
    countdown();
    displayQuestions();

})


