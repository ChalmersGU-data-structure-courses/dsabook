
/* Script for handling simple online quizzes.
Just import this file in your html header like this:
<script type="text/javascript" src="path/to/quizhandler.js"></script>

Here's how you write quizzes. 
- A quiz has to be inside a <div class="quiz">
  and each question inside a <div class="question">
- You can use most form <input> elements
- Correct answers are written as values to the inputs, or marked as checked
- Hints are speficied as <li> list items inside a <div class="hints">
- This script removes all markings and inserts buttons for checking answers 
  and moving to the next question


Here's an example:

<div class="quiz">
<div class="question">
What's the meaning of life? <input type="text" value="42" placeholder="Type your answer"/>
<div class="hints">
<ul>
<li>It's a number</li>
<li>Have you read The hitch-hiker's guide to the galaxy?</li>
</li>
</div>
</div>

<div class="question">
<p>Here are some radio buttons: 
<label><input type="radio" name="radio"/> A is wrong </label>
<label><input type="radio" name="radio" checked/> B is correct </label>
<label><input type="radio" name="radio"/> C is wrong </label>
</p>

<p>And some multiple-value checkboxes:
<label><input type="checkbox" name="radio"/> X is correct </label>
<label><input type="checkbox" name="radio" checked/> Y is wrong </label>
<label><input type="checkbox" name="radio"/> Z is correct </label>
</p>

<p>And a drop-down menu: <select>
<option value="" disabled>Select something</option>
<option>Monkeys</option>
<option>Horses</option>
<option selected>Ants</option>
</select>
</div>

<div class="question">
</div>
If you put input elements inside HTML lists (ul and ol), the list items are shuffled:
<ul>
<li><label><input type="checkbox" name="radio"/> X is correct</label></li>
<li><label><input type="checkbox" name="radio" checked/> Y is wrong</label></li>
<li><label><input type="checkbox" name="radio"/> Z is correct</label></li>
</ul>
</div>
</div>


Pandoc Markdown is well supported... here's an example:

:::::::::: quiz ::::::::::
::::: question
A tool for measuring the efficiency of an algorithm or problem is:

- [x] Algorithm analysis
- [ ] The system clock
- [ ] A profiler
- [ ] Empirical analysis

::: hints
- A profiler works on a program, not an algorithm.
- The system clock works on a program, not an algorithm.
- Empirical analysis works on a program, not an algorithm.
- Algorithm analysis estimates the cost of an algorithm or problem.
:::
:::::

::::: question
Which of these is NOT a definition for efficiency in a computer program?

- [x] It runs in linear time
- [ ] It solves the problem within the required resource contraints
- [ ] It requires fewer resources than known alternatives

::: hints
- One definition for an efficient program is that it runs within the required resource constraints.
- One definition for an efficient program is that it requires fewer resources than known alternatives.
- Many efficient programs require more than linear time. Sometimes linear time is not efficient for a given problem.
:::
:::::
::::::::::::::::::::::::::::::

*/

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
            input.classList.remove('correct');
            input.classList.remove('wrong');
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
                input.classList.toggle('correct', correct);
                input.classList.toggle('wrong', !correct);
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

    shuffleListItems(quest) {
        // Fisher-Yates shuffle, modified from here: https://stackoverflow.com/a/11972692
        for (let list of quest.querySelectorAll('ul, ol')) {
            if (!list.closest('.hints')) {
                // Only shuffle the list items if they are not among the hints.
                for (let i = list.children.length; i >= 0; i--) {
                    list.appendChild(list.children[Math.random() * i | 0]);
                }
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
