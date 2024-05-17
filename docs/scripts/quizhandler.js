
class QuizHandler {
    constructor() {
        for (let quiz of this.getQuizzes()) {
            this.initQuiz(quiz);
        }
    }

    initQuiz(quiz) {
        let questions = this.getQuestions(quiz);
        for (let quest of questions) {
            let html = '<p><button class="checkanswers">Check answers</button> &nbsp; <button class="showhint">Need a hint?</button></p>';
            let firstHint = quest.querySelector('.hints');
            if (firstHint) {
                firstHint.insertAdjacentHTML('beforebegin', html);
            } else {
                quest.insertAdjacentHTML('beforeend', html);
            }
            quest.querySelector('.checkanswers').addEventListener('click', this.checkAnswers.bind(this));
            quest.querySelector('.showhint').addEventListener('click', this.showHint.bind(this));
        }

        questions[0].insertAdjacentHTML(
            'beforebegin',
            '<p><button class="nextquestion">Start quiz</button></p>',
        );
        quiz.querySelector('.nextquestion').addEventListener('click', this.nextQuestion.bind(this));

        for (let input of this.getInputs(quiz)) {
            input.dataset.solution = this.getAnswer(input);
        }
        this.clearAnswers(quiz, true);
        this.hideQuestions(questions);
    }

    hideQuestions(questions) {
        for (let quest of questions) {
            this.setVisibility(quest, false);
            for (let hint of this.getHints(quest)) {
                this.setVisibility(hint, false);
            }
            for (let button of quest.querySelectorAll('button')) {
                button.disabled = false;
            }
        }
    }

    clearAnswers(quiz) {
        for (let input of this.getInputs(quiz)) {
            input.disabled = false;
            input.value = "";
            input.checked = false;
            for (let label of input.labels) {
                label.classList.remove('correct');
                label.classList.remove('wrong');
            }
        }
    }

    getActive(questions) {
        for (let i = 0; i < questions.length; i++) {
            if (this.isVisible(questions[i])) {
                return i;
            }
        }
        return -1;
    }

    showHint(event) {
        let button = event.target;
        let quiz = this.getQuiz(button);
        let questions = this.getQuestions(quiz);
        let quest = questions[this.getActive(questions)];
        let hints = this.getHints(quest);
        for (let i = 0; i < hints.length; i++) {
            if (!this.isVisible(hints[i])) {
                this.setVisibility(hints[i], true);
                button.disabled = i >= hints.length-1;
                return;
            }
        }
    }

    checkAnswers(event) {
        let button = event.target;
        let quiz = this.getQuiz(button);
        let questions = this.getQuestions(quiz);
        let quest = questions[this.getActive(questions)];
        if (this.isGraded(quest)) {
            this.clearAnswers(quiz);
            button.innerText = "Check answers";
        } else {
            for (let input of this.getInputs(quest)) {
                input.disabled = true;
                let correct = input.dataset.solution === this.getAnswer(input);
                for (let label of input.labels) {
                    label.classList.toggle('correct', correct);
                    label.classList.toggle('wrong', !correct);
                }
            }
            button.innerText = "Clear grading";
        }
    }

    nextQuestion(event) {
        let button = event.target;
        let quiz = this.getQuiz(button);
        let questions = this.getQuestions(quiz);
        let q = 1 + this.getActive(questions);
        this.clearAnswers(quiz);
        this.hideQuestions(questions);
        if (0 <= q && q < questions.length) {
            let quest = questions[q];
            this.setVisibility(quest, true);
            this.shuffleListItems(quest);
            button.innerText = q < questions.length-1 ? "Next question" : "Close quiz";
        } else {
            button.innerText = "Start quiz";
        }
    }

    shuffleArray(array) {
        for (let i = array.length-1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleListItems(quest) {
        // Idea from here: https://stackoverflow.com/a/11972692
        for (let list of quest.querySelectorAll('ul, ol')) {
            for (let i = list.children.length; i >= 0; i--) {
                list.appendChild(list.children[Math.random() * i | 0]);
            }
        }
    }

    getQuizzes() {
        return document.querySelectorAll('.quiz');
    }

    getQuiz(elem) {
        return elem.closest('.quiz');
    }

    getQuestions(quiz) {
        return quiz.querySelectorAll('.question');
    }

    getHints(quest) {
        return quest.querySelectorAll('.hints li');
    }

    getInputs(quest) {
        return quest.querySelectorAll('input, select');
    }

    getAnswer(input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
            return String(input.checked);
        } else {
            return input.value.trim();
        }
    }

    isGraded(quest) {
        return quest.querySelector('.correct, .wrong');
    }

    isVisible(elem) {
        return elem.style.display !== "none";
    }

    setVisibility(elem, visibility) {
        if (visibility) {
            elem.style.removeProperty('display');
        } else {
            elem.style.display = "none";
        }
    }

}

document.addEventListener("DOMContentLoaded", () => new QuizHandler());
