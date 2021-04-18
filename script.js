var buttonStart = document.getElementById("start-btn");
var questionContainer = document.getElementById('question-container');
var buttonNext = document.getElementById('next-btn');
var timeEl = document.querySelector('.time')
var timer = document.getElementById('time-down');
const questionEl = document.getElementById('question')
const answerBtEl = document.getElementById('answer-btn')
var finalId = document.getElementById("final-container");
var highScores = document.getElementById('high-score')
var responseEl = document.getElementById('game')
var finalScore = document.getElementById('score')
var timerinterval
var secondsleft = 60;
var myTimer;
var questionIndex = 0
var scores = []

// shuffles questions and tells us which question in the shuffle question we are on

// change it to "let" so we can define it later
let questionShu

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
function chooseAnswer(choice) {

  //whatever potential answer we click on 
  // target: returns the element that triggered the event.
  const selectedButton = choice.target
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

    clearInterval(timerinterval);
    questionContainer.classList.add("hide")
    //returns all of the classes from that list
    finalId.classList.remove("hide")
    var spanId = document.getElementById('score')
    spanId.textContent = secondsleft
    var buttonGame = document.getElementById('game')
    buttonGame.addEventListener("click", function (event) {
      // event.preventDefault();

      console.log(event)
      var initialsGame = document.getElementById("initials")
      var initials = initialsGame.value
      console.log(initials)
      console.log(secondsleft)
      var results = JSON.parse(localStorage.getItem("Scores")) || []
      // console.log("+++++++")
      // console.log(results[0].initials)
      // console.log("+++++++")
      var newResult = { "initials": initials, "score": secondsleft }
      results.push(newResult)
      localStorage.setItem(initials, JSON.stringify(secondsleft))
      var response = "Thank You for your submission "
      responseEl.textContent = response;
    })

    // buttonStart.innerText = 'Restart'
    // buttonStart.classList.remove('hide')
  }
}

function displayUserScore() {
  console.log(localStorage.getItem("Scores"))
  var userlog = JSON.parse(localStorage.getItem("codeQuiz")) || [];
  document.getElementById("high-score").innerHTML = "<h5>High Scores</h5>"
  var userHighScore;
  var userHighScoreName;
  var currentHighScore;
  for (let i = 0; i < userlog.length; i++) {
    console.log(localStorage.getItem("codeQuiz"))
    var element = document.createElement("p");
    element.textContent = "user " + userlog[i].initials + "score " + userlog[i].score;
    document.getElementById("high-score").append(element)
  }

}

function endGame() {
  finishButton.classList.add("hide")
  questionElement.classList.add("hide")
  answerButtonsElement.classList.add("hide")
  endScreenElement.classList.remove("hide")
  //stop timer, enter time value to scoreboard
  //initials need to go to scoreboard
  clearInterval(timerInterval);
  finalScore.innerText = (secondsLeft)
}



displayUserScore()
function endQuiz() {
  var quizScore = document.createElement("h3")
  quizScore.innerText = "Your Score is " + secondsleft;
  final - container.prepend(quizScore);
  displayUserScore()
}
// var score = JSON.parse(localStorage.getItem("HighScore")) || []
// var newScore = { "initials": initials, "high-score": secondsleft }
// function displayHighScore() {
//   $("#high-score").empty();
//   for (var i = 0; i < newScore.length; i++) {
//     var pastScores = $(`<div></div>`);
//     pastScores.text(newScore[i]);
//     $("#high-score").prepend(pastScores);
//   }
// }
// score.push(newScore)
// localStorage.setItem("HighScore", JSON.stringify(score))
// $("#high-score").text(initials);

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
      button.addEventListener("click", function (choice) {
        chooseAnswer(choice)

      })
    } else {
      button.addEventListener("click", function (choice) {
        chooseAnswer(choice)
        secondsleft -= 5;
      })
    }
    answerBtEl.appendChild(button)
  })

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
    if (secondsleft === 0) {
      clearInterval(timerinterval);
      endQuiz()
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



