const questionContainers = document.querySelectorAll('.question-area');

export function showResults() {
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
        const firstQuestionAnswers = allResults[0].querySelector(
            '.answered-questions'
        );
        if (i + 1 != firstAnswers.length) {
            firstQuestionAnswers.textContent +=
                ' ' + firstAnswers[i].textContent + ', ';
        } else
            firstQuestionAnswers.textContent +=
                ' ' + firstAnswers[i].textContent;
    }
    for (let i = 0; i < secondAnswers.length; i++) {
        const secondQuestionAnswers = allResults[1].querySelector(
            '.answered-questions'
        );
        if (i + 1 != secondAnswers.length) {
            secondQuestionAnswers.textContent +=
                ' ' + secondAnswers[i].textContent + ', ';
        } else
            secondQuestionAnswers.textContent +=
                ' ' + secondAnswers[i].textContent;
    }
    for (let i = 0; i < thirdAnswers.length; i++) {
        const thirdQuestionAnswers = allResults[2].querySelector(
            '.answered-questions'
        );
        if (i + 1 != thirdAnswers.length) {
            thirdQuestionAnswers.textContent +=
                ' ' + thirdAnswers[i].textContent + ', ';
        } else
            thirdQuestionAnswers.textContent +=
                ' ' + thirdAnswers[i].textContent;
    }
    for (let i = 0; i < fourthAnswers.length; i++) {
        const fourthQuestionAnswers = allResults[3].querySelector(
            '.answered-questions'
        );
        if (i + 1 != fourthAnswers.length) {
            fourthQuestionAnswers.textContent +=
                ' ' + fourthAnswers[i].textContent + ', ';
        } else
            fourthQuestionAnswers.textContent +=
                ' ' + fourthAnswers[i].textContent;
    }
    window.scrollTo(0, 0);
    resultScreen.style.top = '0';
}

export function showError(message) {
    const errorScreen = document.querySelector('.error-screen');
    document.querySelector('.number-of-answers').textContent = message;
    errorScreen.style.top = '0';
    setTimeout(() => {
        errorScreen.style.top = '-100vh';
    }, 3000);
}
