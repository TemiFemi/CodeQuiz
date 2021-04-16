var buttonStart = document.getElementById("start-btn");
var questionContainer = document.getElementById('question-container');
var buttonNext = document.getElementById('next-btn');
var timeEl = document.querySelector('.time')
var timer = document.getElementById('time-down');
const questionEl = document.getElementById('question')
const answerBtEl = document.getElementById('answer-btn')
var finalId = document.getElementById("final-container");
var highScores = document.getElementById('high-score')
var timerinterval
var secondsleft = 60;

// shuffles questions and tells us which question in the shuffle question we are on

// change it to "let" so we can define it later
let questionShu, questionIndex

//ques the code in the start menu
buttonStart.addEventListener('click', gameStart);
buttonNext.addEventListener('click', () => {
  // incrementing to next question
  questionIndex++
  nextQuestion()
})


function gameStart() {
  // hides start button
  buttonStart.classList.add('hide');
  questionShu = questions.sort(() => Math.floor(Math.random() * questions.length))
  console.log(questionShu)
  //starts at the very first question
  questionIndex = 0
  // removes the 'hide' class and reveals Questions and Answers
  questionContainer.classList.remove('hide');
  //calls and sets the next question for us
  nextQuestion()
  buttonNext.classList.remove('hide')
}

// what happens when we select the next button
function nextQuestion() {
  // resets everything related to our form, questions, etc.
  resetState()
  // shows us our current question in the current question index
  showQuestion(questionShu[questionIndex])

}

// select answer when we do something
function chooseAnswer(e) {
  //whatever potential answer we click on 
  // target: returns the element that triggered the event.
  const selectedButton = e.target
  // check to see if it's correct
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  // for each for different buttons
  Array.from(answerBtEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  // have more questions to go through

  if (questionShu.length > questionIndex + 1) {
    buttonNext.classList.remove('hide')
  } else {
    //restarts game
    clearInterval(timerinterval);
    questionContainer.classList.add("hide")
    //returns all of the classes from that list
    finalId.classList.remove("hide")
    var spanId = document.getElementById('score')
    spanId.textContent = secondsleft
    var buttonGame = document.getElementById('game')
    buttonGame.addEventListener("click", function () {
      var initialsGame = document.getElementById("initials")
      var initials = initialsGame.value
      console.log(initials)
      console.log(secondsleft)
      var results = JSON.parse(localStorage.getItem("Scores")) || []
      var newResult = { "initials": initials, "score": secondsleft }
      results.push(newResult)
      localStorage.setItem("Scores", JSON.stringify(results))
    })
    // buttonStart.innerText = 'Restart'
    // buttonStart.classList.remove('hide')
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
  questionEl.innerText = data.question;
  // Populates our different answers
  data.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', chooseAnswer)
    //apends button that was created.
    answerBtEl.appendChild(button)
  });


}


function resetState() {
  clearStatusClass(document.body)
  buttonNext.classList.add('hide')
  // if there is a child in the answer button element then we want to remove it.
  while (answerBtEl.firstChild) {
    answerBtEl.removeChild
      (answerBtEl.firstChild)
  }
}


function setTime() {
  timerinterval = setInterval(function () {
    secondsleft--;
    timeEl.textContent = secondsleft
    // if time ran out
    document.getElementById('time-down')
    if (secondsleft < 0) {
      clearInterval(timerinterval);
      alert("time is up!")
    }
    // if (secondsleft === 0) {
    //   clearInterval(timerinterval);
    // }
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
    ]
  },
  {
    question: 'Who is the cutest in the class?',
    answers: [
      { text: 'Temi', correct: false },
      { text: 'Bulldog', correct: true },
      { text: 'Brandon', correct: false },
      { text: 'Mike', correct: false }
    ]
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alertBox("Hello World")', correct: false },
      { text: 'msg("Hello World")', correct: false },
      { text: 'msgBox("Hello World")', correct: false },
      { text: 'alert("Hello World")', correct: false }
    ]
  }
]


