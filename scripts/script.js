// Variables, Constants and Imports

const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.previous-button');
const showResultsButton = document.querySelector('.show-results-button');
const questionContainers = document.querySelectorAll('.question-area');
const questions = document.querySelectorAll('.question');
const navBarElements = document.querySelectorAll('.nav-bar__element');

showResultsButton.disabled = true;

let nextQuestionIndex = 1;
let currentQuestionIndex = 0;
let previousQuestionIndex = -1;

import { showResults, showError } from './showScreens.js';
import {
    adjustButtonText,
    updateNavBar,
    updateResultButton,
} from './screenUpdates.js';

// Event Listeners

window.addEventListener('DOMContentLoaded', generateAnswers);
window.addEventListener('resize', adjustButtonText);

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

navBarElements.forEach((element) => {
    element.addEventListener('click', () => {
        navigateToQuestion(element.firstChild.textContent);
    });
});

//Navigation Functions

function navigateToQuestion(index) {
    currentQuestionIndex = index - 2;
    nextQuestionIndex = index - 1;
    previousQuestionIndex = index - 3;
    nextQuestion();
    updateNavBar(currentQuestionIndex);
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

//Question Related Functions

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
        await checkForErrors(question);
    } catch (error) {
        showError(error.message);
        return;
    }
    question.classList.toggle('selected-question');
    updateNavBar(currentQuestionIndex);
    updateResultButton();
}

function generateNumberOfAnswers(min) {
    return Math.round(Math.random() * (8 - min) + min);
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

//Initial Runs

updateNavBar(currentQuestionIndex);

if (window.innerWidth < 950) adjustButtonText();
