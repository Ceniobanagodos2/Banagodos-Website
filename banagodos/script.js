const questions = [
    {
        question: "What is XML stands for",
        answers: [
          { text: "Extended Markup Language", correct: false},
          { text: "Extensible Markup Language", correct: true},
          { text: "Extension Markup Language", correct: false},
          { text: "Extend Markup Language", correct: false},
        ]
    },
    {
        question: "What is HTML stands for",
        answers: [
          { text: "HyperText Markup Language", correct: true},
          { text: "HigherTide Markup Language", correct: false},
          { text: "HighText Markup Language", correct: false},
          { text: "HyperTexted Markup Language", correct: false},
        ]
    },
    {
      question: "What is Java Servlets?",
      answers: [
        { text: "is a java have a powerful way to extend", correct: false},
        { text: "is a java are variables that are passed into methods or constructors", correct: false},
        { text: "is a java program that runs in a web", correct: false},
        { text: "is a java programing language components that extended the capabilities of a server", correct: true},
      ]
    },
    {
      question: "What are the four Servlet Life Cycle",
      answers: [
        { text: "loading, initialize, handler, destroying", correct: false},
        { text: "loading, initializing, request handling, destroying", correct: true},
        { text: "load, initializing, request handler, destroy", correct: false},
        { text: "loading, initializng, request handling, distribution", correct: false},
      ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
      showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
  }else{
    startQuiz();
  }
})
startQuiz();