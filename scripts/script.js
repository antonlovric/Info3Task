const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.previous-button');
const showResultsButton = document.querySelector('.show-results-button');
const questionContainers = document.querySelectorAll('.question-area');
const questions = document.querySelectorAll('.question');
const navBarElements = document.querySelectorAll('.nav-bar__element');
// questionContainers[1].scrollIntoView();

let nextQuestionIndex = 1;
let currentQuestionIndex = 0;
let previousQuestionIndex = -1;

window.addEventListener('DOMContentLoaded', generateAnswers);

navBarElements.forEach((element) => {
    element.addEventListener('click', () => {
        navigateToQuestion(element.firstChild.textContent);
    });
});

function navigateToQuestion(index) {
    currentQuestionIndex = index - 2;
    nextQuestionIndex = index - 1;
    previousQuestionIndex = index - 3;
    nextQuestion();
    updateNavBar(currentQuestionIndex);
}

questions.forEach((question) => {
    question.addEventListener('click', () => {
        toggleQuestion(question);
    });
});
nextButtons.forEach((button) => {
    button.addEventListener('click', nextQuestion);
});
prevButtons.forEach((button) => {
    button.addEventListener('click', previousQuestion);
});
showResultsButton.addEventListener('click', () => {});

function nextQuestion() {
    updateNavBar(++currentQuestionIndex);
    const distance = nextQuestionIndex * 100;
    document.querySelector('.container').style.transform =
        'translateX(-' + distance + '%)';
    nextQuestionIndex++;
    previousQuestionIndex++;
}

function previousQuestion() {
    updateNavBar(--currentQuestionIndex);

    const distance = previousQuestionIndex * 100;
    document.querySelector('.container').style.transform =
        'translateX(-' + distance + '%)';
    previousQuestionIndex--;
    nextQuestionIndex--;
}

function generateAnswers() {
    questionContainers.forEach((questionContainer, i) => {
        const answers = questionContainer.querySelectorAll(
            '.question-container'
        );
        const numberofAnswers = generateNumberOfAnswers(i + 3);
        for (let i = numberofAnswers; i < 8; i++) {
            answers[i].style.display = 'none';
        }
    });
}

async function toggleQuestion(question) {
    try {
        const check = await checkForErrors(question);
    } catch (error) {
        showError(error.message);
        return;
    }
    question.classList.toggle('selected-question');
    updateNavBar(currentQuestionIndex);
    updateResultButton();
}

async function checkForErrors(question) {
    const allowedQuestions = question
        .closest('.question-area')
        .querySelector('.possible-answers__number').innerText;
    console.log(question);
    const answeredQuestions = question
        .closest('.question-area')
        .querySelectorAll('.selected-question');
    console.log(answeredQuestions);
    if (answeredQuestions.length == allowedQuestions) {
        throw Error(allowedQuestions);
    }
}

function showError(message) {
    console.log(message);
    const errorScreen = document.querySelector('.error-screen');
    document.querySelector('.number-of-answers').textContent = message;
    errorScreen.style.top = '0';
    setTimeout(() => {
        errorScreen.style.top = '-100vh';
    }, 3000);
}

function generateNumberOfAnswers(min) {
    return Math.round(Math.random() * (8 - min) + min);
}

function updateNavBar(index) {
    navBarElements.forEach((element) => {
        element.classList.remove('orange-background');
    });
    for (let i = 0; i < 4; i++) {
        console.log(questionContainers[i].querySelector('.selected-question'));
        const answered =
            questionContainers[i].querySelector('.selected-question');
        if (answered == null) {
            navBarElements[i].classList.remove('answered');
        } else {
            navBarElements[i].classList.add('answered');
        }
    }
    navBarElements[index].classList.add('orange-background');
}

function updateResultButton() {
    navBarElementsArray = Array.from(navBarElements);
    const answeredQuestions = navBarElementsArray.filter((element) =>
        element.classList.contains('answered')
    );
    if (answeredQuestions.length == 4) {
        showResultsButton.disabled = false;
    } else {
        showResultsButton.disabled = true;
    }
}
updateNavBar(currentQuestionIndex);
