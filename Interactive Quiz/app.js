const questions = [
    { question: 'What is a baby alligator called?', choices: ['Baby', 'Gator', 'Hatchling', 'Calf'], correctAnswer: 2 },
    { question: 'What is a baby goose called?', choices: ['Gooser', 'Gosling', 'Gup', 'Pup'], correctAnswer: 1 },
    { question: 'What is the baby of a moth known as?', choices: ['Baby', 'Infant', 'Kit', 'Larva'], correctAnswer: 3 },
    { question: 'What is the baby of a kangaroo called?', choices: ['Cub', 'Joey', 'Fawn', 'Pup'], correctAnswer: 1 },
    { question: 'What is the adult of a kid called?', choices: ['Calf', 'Doe', 'Goat', 'Chick'], correctAnswer: 2 },
    { question: 'What is the young of a buffalo called?', choices: ['Calf', 'Baby', 'Pup', 'Cow'], correctAnswer: 0 },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timer = 30;
let timerInterval;

const questionElement = document.querySelector('.question');
const choiceListElement = document.querySelector('.choice-list');
const feedbackElement = document.querySelector('.feedback');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const startAgainButton = document.querySelector('.start-again'); 
const scoreElement = document.querySelector('.score');

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    choiceListElement.innerHTML = '';
    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.innerText = choice;
        li.setAttribute('data-index', index);
        li.addEventListener('click', () => handleAnswer(index));
        choiceListElement.appendChild(li);
    });

    feedbackElement.style.display = 'none';
    updateControls();
}

function handleAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correctAnswer;

    if (selectedIndex === correctIndex) {
        feedbackElement.style.display = 'block';
        feedbackElement.style.color = 'lime';
        feedbackElement.innerText = 'Correct!';
        correctAnswers++;
    } else {
        feedbackElement.style.display = 'block';
        feedbackElement.style.color = 'red';
        feedbackElement.innerText = `Incorrect! Correct answer: ${questions[currentQuestionIndex].choices[correctIndex]}`;
    }
}

function updateControls() {
    prevButton.disabled = currentQuestionIndex === 0;
    nextButton.innerText = currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next';
}

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        clearInterval(timerInterval); // Stop the timer
        showScore();
    }
});

startAgainButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    timer = 20;
    startTimer(); // Restart timer
    choiceListElement.style.display = 'block';
    questionElement.style.display = 'block';
    nextButton.style.display = 'inline-block';
    prevButton.style.display = 'inline-block';
    startAgainButton.style.display = 'none';
    scoreElement.style.display = 'none';
    displayQuestion();
});

// Timer functionality
function startTimer() {
    clearInterval(timerInterval); // Clear any previous interval
    timerInterval = setInterval(() => {
        timer--;
        document.title = `Time Left: ${timer}s`; // Update timer in page title for visibility

        if (timer === 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            showScore();
        }
    }, 1000);
}

function showScore() {
    scoreElement.style.display = 'block';
    scoreElement.innerText = `You scored ${correctAnswers} out of ${questions.length}!`;
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    startAgainButton.style.display = 'inline-block';
    choiceListElement.style.display = 'none';
    questionElement.style.display = 'none';
    document.title = 'Quiz Completed'; // Update page title when finished
}

// Start the quiz and timer
displayQuestion();
startTimer();
