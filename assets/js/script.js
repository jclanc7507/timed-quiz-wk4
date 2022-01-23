const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById
('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById
('answer-buttons')

let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text 
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState () {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            {text: "Douglas Crockford", correct: false},
            {text: "Sheryl Sandberg", correct: false},
            {text: "Brendan Eich", correct: true},
            {text: "Abraham Lincoln", correct: false}
        ] 
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            {text: "Angular", correct: false},
            {text: "jQuery", correct: false},
            {text: "RequireJS", correct: false},
            {text: "ESLint", correct: true}
        ]        
    },
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "HyperText Markup Lines", correct: false},
            {text: "HyperText Markup Language", correct: true},
            {text: "HighText Markup Language", correct: false},
            {text: "HyperText Management Language", correct: false}
        ]        
    },
    {
        question: "Is JavaScript the same as Java?",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true}
        ]        
    },
    {
        question: "What function does the all-Capitilzed part of the following code act as? 'VAR taskInProgressEl = document.querySelector();'",
        answers: [
            {text: "function", correct: true},
            {text: "selector", correct: false},
            {text: "reference", correct: false},
            {text: "class/id", correct: false}
        ]
    }
]