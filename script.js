var buttonStart = document.getElementById("start-btn");
var questionContainer = document.getElementById('question-container');
var nextButton = document.getElementById('next-btn');
var timeEl = document.querySelector('.time')
var timer = document.getElementById('time-down');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btn')
var secondsleft = 60;

// shuffles questions and tells us which question in the shuffle question we are on

// change it to "let" so we can define it later
let shuffledQuestions, currentQuestionIndex

//ques the code in the start menu
buttonStart.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  // incrementing to next question
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  // hides start button
  buttonStart.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.floor(Math.random() * questions.length))
  console.log(shuffledQuestions)
  //starts at the very first question
  currentQuestionIndex = 0
  // removes the 'hide' class and reveals Questions and Answers
  questionContainer.classList.remove('hide');
  //calls and sets the next question for us
  setNextQuestion()
  nextButton.classList.remove('hide')
}

// what happens when we select the next button
function setNextQuestion() {
  // resets everything related to our form, questions, etc.
  resetState()
  // shows us our current question in the current question index
  showQuestion(shuffledQuestions[currentQuestionIndex])

}

// select answer when we do something
function selectAnswer(e) {
  //whatever potential answer we click on 
  // target: returns the element that triggered the event.
  const selectedButton = e.target
  // check to see if it's correct
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  // for each for different buttons
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // have more questions to go through
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    //restarts game
    buttonStart.innerText = 'Restart'
    buttonStart.classList.remove('hide')
  }

}

function setStatusClass(element, correct) {
  // Takes element that will be cleared   
  clearStatusClass(element)
  // if correct add right class
  if (correct) {
    element.classList.add('correct')
    // add wrong class
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function showQuestion(data) {
  questionElement.innerText = data.question;
  // Populates our different answers
  data.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    //apends button that was created.
    answerButtonsElement.appendChild(button)
  });

}


function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  // if there is a child in the answer button element then we want to remove it.
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
  }
}


function setTime() {
  var timerinterval = setInterval(function () {
    secondsleft--;
    timeEl.textContent = secondsleft
    // if time ran out
    if (secondsleft === 0) {
      clearInterval(timerinterval);
    }
  }, 1000);
}
setTime()

const questions = [
  {
    question: 'What is the correct HTML element ',
    answers: [
      { text: '<h1>', correct: true },
      { text: '<h3>', correct: false },
      { text: '<d>', correct: false },
      { text: '<button>', correct: false }

    ]
  },
  {
    question: 'What is the correct HTML element for inserting a line break',
    answers: [
      { text: '<br>', correct: true },
      { text: '<section>', correct: false },
      { text: '<detail>', correct: false },
      { text: '<temi>', correct: false }
    ]
  },
  {
    question: 'Who spits hot fire?',
    answers: [
      { text: 'Dylan', correct: true },
      { text: 'Dylan', correct: true },
      { text: 'Dylan', correct: true },
      { text: 'Dylan', correct: true },
      { text: 'Dylan', correct: true }
    ],
  }
]

