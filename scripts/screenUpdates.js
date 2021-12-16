const questionContainers = document.querySelectorAll('.question-area');
const navBarElements = document.querySelectorAll('.nav-bar__element');
const showResultsButton = document.querySelector('.show-results-button');
const nextButtons = document.querySelectorAll('.next-button');
const prevButtons = document.querySelectorAll('.previous-button');

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
    const navBarElementsArray = Array.from(navBarElements);
    const answeredQuestions = navBarElementsArray.filter((element) =>
        element.classList.contains('answered')
    );
    if (answeredQuestions.length == 4) {
        showResultsButton.disabled = false;
    } else {
        showResultsButton.disabled = true;
    }
}

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

export { updateNavBar, updateResultButton, adjustButtonText };
