const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.previous-button');
const showResultsButton = document.querySelector('.show-results-button');
const questionContainers = document.querySelectorAll('.question-area');
const questions = document.querySelectorAll('.question');
const navBarElements = document.querySelectorAll('.nav-bar__element');

let nextQuestionIndex = 1;
let currentQuestionIndex = 0;
let previousQuestionIndex = -1;

window.addEventListener('DOMContentLoaded', generateAnswers);
window.addEventListener('resize', adjustButtonText);

if (window.innerWidth < 950) adjustButtonText();

function adjustButtonText() {
    if (window.innerWidth < 950) {
        nextButtons.forEach((button) => {
            button.textContent = '=>';
        });
        prevButtons.forEach((button) => {
            button.textContent = '<=';
        });
    } else if (nextButtons[0].textContent == '=>') {
        nextButtons.forEach((button) => {
            button.textContent = 'Next';
        });
        prevButtons.forEach((button) => {
            button.textContent = 'Previous';
        });
    }
}

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
showResultsButton.addEventListener('click', () => {
    showResults();
});

function showResults() {
    const resultScreen = document.querySelector('.result-screen');
    const allResults = resultScreen.querySelectorAll('.result');
    const firstAnswers = questionContainers[0]
        .querySelector('.main-container__questions')
        .querySelectorAll('.selected-question');
    const secondAnswers = questionContainers[1]
        .querySelector('.main-container__questions')
        .querySelectorAll('.selected-question');
    const thirdAnswers = questionContainers[2]
        .querySelector('.main-container__questions')
        .querySelectorAll('.selected-question');
    const fourthAnswers = questionContainers[3]
        .querySelector('.main-container__questions')
        .querySelectorAll('.selected-question');
    for (let i = 0; i < firstAnswers.length; i++) {
        if (i + 1 != firstAnswers.length) {
            allResults[0].innerHTML += ' ' + firstAnswers[i].textContent + ', ';
        } else allResults[0].innerHTML += ' ' + firstAnswers[i].textContent;
    }
    for (let i = 0; i < secondAnswers.length; i++) {
        if (i + 1 != secondAnswers.length) {
            allResults[1].innerHTML +=
                ' ' + secondAnswers[i].textContent + ', ';
        } else allResults[1].innerHTML += ' ' + secondAnswers[i].textContent;
    }
    for (let i = 0; i < thirdAnswers.length; i++) {
        if (i + 1 != thirdAnswers.length) {
            allResults[2].innerHTML += ' ' + thirdAnswers[i].textContent + ', ';
        } else allResults[2].innerHTML += ' ' + thirdAnswers[i].textContent;
    }
    for (let i = 0; i < fourthAnswers.length; i++) {
        if (i + 1 != fourthAnswers.length) {
            allResults[3].innerHTML +=
                ' ' + fourthAnswers[i].textContent + ', ';
        } else allResults[3].innerHTML += ' ' + fourthAnswers[i].textContent;
    }
    resultScreen.style.top = '0';
}

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
    const answeredQuestions = question
        .closest('.question-area')
        .querySelectorAll('.selected-question');
    if (question.classList.contains('selected-question')) return;
    if (answeredQuestions.length == allowedQuestions) {
        throw Error(allowedQuestions);
    }
}

function showError(message) {
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
