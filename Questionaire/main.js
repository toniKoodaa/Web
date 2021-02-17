/* Make a mobile optimized multiple-choice quiz using jQuery Mobile and radio button widgets. 
The quiz must have at least 3 questions and each question must have at least 3 different choices. 
Pressing “answer” button will calculate how many questions you got correct. 
The questions and their answers should be stored in JSON format. */

let currentQuestion = 0;
let score = 0;
let questionData = []
let correct = 0;
const answerSelectionEl = document.getElementsByName('choose')
const buttonEl = document.getElementById('next')
const questionEl = document.getElementById('question')
const answersEl = document.getElementsByName('answer');
const outputEl = document.getElementById('score');

startProgram();

// Display current question and answers
function askQuestion() {
    if(currentQuestion > questionData.length -1) {
        allAnswered();
        return;
    }

    let answers = questionData[currentQuestion].answer;
    questionEl.innerHTML= questionData[currentQuestion].question;
    
    for (let i = 0; i < answersEl.length; i++) {
        answersEl[i].innerHTML = answers[i];
    }
}

// Go to next question. Have end condition if there is no more questions. Also check for correct answer.
function nextQuestion() {
    if(currentQuestion > questionData.length -1) {
        alert('There is no more questions')
        return;
    }
    correct = questionData[currentQuestion].correct;
    checkAnswer(correct)
    currentQuestion++;
    askQuestion()
}

// If all answered display score to output element
function allAnswered() {
    outputEl.innerHTML = `<h1>You got ${score} correct answers!</h1>`;
}

// Initialise program. Fetch data from json file and initialise values.
async function startProgram() {
    currentQuestion = 0;
    score = 0;
    correct = 0;
    const response = await fetch("data.json");
    const data = await response.json();
    questionData = data;
    // when data is ready ask first question
    askQuestion();
}

// Check what button is pressed and increase score if correct.
function checkAnswer(correct) {
    let selected;
    answerSelectionEl.forEach(answerSelected => {
        if(answerSelected.checked) {
            selected = answerSelected.id
        }
    })
    if (selected === correct) {
        score++;
    }
}

// answer button takes you to next question
buttonEl.addEventListener('click', () =>  {
    nextQuestion();
});