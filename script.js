// string - ""
// list - []
// dictionary - {} A dictionary has key-value pair

const quizData = [
    {
        question: "When did Singapore surender to the japaness?",
        options:  ["8 Febuary 1942", "15 Febuary 1942", "15 August 1945"],
        answer: "8 Febuary 1942"
    },

    {
        question: "When was Singapore officaly independen?",
        options:  ["9 August 1964", "15 Febuary 1942", "9 August 1965"],
        answer: "9 August 1965"
    },

    {
        question: "Who is Singapore's 1st president?",
        options:  ["Sir Stamford Raffles", "Yusof bin Ishak", "Devan Nair"],
        answer: "Yusof bin Ishak"
    },
    
    {
        question: "Who is the first woman president of Singapore?",
        options:  ["Lady Noor Aishah", "Halimah Yacob", "Kwa Geok Choo"],
        answer: "Halimah Yacob"
    },

    {
        question: "How many presidents has Singapore had till 2024?",
        options:  ["8", "9", "10"],
        answer: "9"
    }
];

const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const timerText = document.getElementById('countdown');
const progressbar = document.getElementById('progress-bar');
const progressBarContainer = document.getElementById('progress-bar-container');
const optionsElement = document.getElementById('option-container');

progressbar.style.width = '0%';

let timer;
let currentQuestion = 0;
let score = 0;


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none';
    progressBarContainer.style.display = 'block';
    resultElement.textContent = `You scored ${score} points`;
    loadQuestion();
}

function loadQuestion()
{
    // reset the timer
    clearInterval(timer);
    
    if(currentQuestion < quizData.length)
    {
        // Update the progress bar
        progressbar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

        const currentQuizData = quizData[currentQuestion];
        questionElement.textContent = currentQuizData.question;

        // Set initial countdown value
        timerText.textContent = 15; 

        optionsElement.innerHTML = ''; // clear previous options

        // Clone a button for each options in a question
        currentQuizData.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            optionsElement.appendChild(button);

            button.addEventListener('click', () => {
                checkAnswer(option);
            });
        });


        // Start the countdown for the current question
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset the timer
                clearInterval(timer);

                currentQuestion = currentQuestion + 1;

                loadQuestion();
            }
        }, 1000);
    } else {
        showResult();
    }
}


function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];

    if(option === currentQuizData.answer)
    {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

function checkAnswer(option)
{
    const currentQuizData = quizData[currentQuestion];

    if(option === currentQuizData.answer) 
    {
        score++;
    }

    resultElement.textContent = `You scored ${score} points`;
    currentQuestion++;
    loadQuestion();
}

function showResult()
{
    clearInterval(timer);
    timerElement.style.display = 'none'; // Hide the timer
    progressBarContainer.style.display = 'none';
}
