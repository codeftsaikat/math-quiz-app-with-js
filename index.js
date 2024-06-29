const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer_form');
const scoreEl = document.getElementById('score');
let storedAnswer;
let score = localStorage.getItem('score');
const randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
        const firstNumber1 = randomNumber(1, 10);
        const secondNumber2 = randomNumber(1, 10);
        const questionType = randomNumber(1, 4);
        let firstNumber;
        let secondNumber;
        let question;
        let answer;

        if (firstNumber > secondNumber && questionType > 2) {
                firstNumber = firstNumber1;
                secondNumber = secondNumber2;
        } else {
                firstNumber = secondNumber2;
                secondNumber = firstNumber1;
        }



        switch (questionType) {
                case 1:
                        question = question = `Q. What is ${firstNumber} multiply by ${secondNumber} ?`;
                        answer = firstNumber * secondNumber;
                        break;
                case 2:
                        question = question = `Q. What is ${firstNumber} addition by ${secondNumber} ?`;
                        answer = firstNumber + secondNumber;
                        break;

                case 3:
                        question = question = `Q. What is ${firstNumber} divided by ${secondNumber} ?`;
                        answer = firstNumber / secondNumber;
                        break;
                default:
                        question = question = `Q. What is ${firstNumber} subtraction by ${secondNumber} ?`;
                        answer = firstNumber - secondNumber;
                        break;
        };
        return {
                question,
                answer
        };
};

const showQuestion = () => {
        const {
                question,
                answer
        } = generateQuestion();
        questionEl.innerText = question;
        scoreEl.innerText = score;
        storedAnswer = answer;
}
showQuestion();

const checkAnswer = (event) => {
        event.preventDefault();
        const formData = new FormData(answerEl)
        const userAnswer = +formData.get('answer')
        if (userAnswer === storedAnswer) {
                score += 1;
                Toastify({
                        text:` Your Answer Is Correct And Your Score is ${score}`,
                        gravity: "bottom",
                        position:"center",
                        style: {
                                background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                }).showToast();
        } else {
                score -= 1;
                   Toastify({
                           text: ` Your Answer Is Wrong And Your Score is ${score}`,
                           gravity: "bottom",
                           position: "center",
                           style: {
                                   background: "linear-gradient(to right, #e33217, #ff001e)",
                           }
                   }).showToast();
        }
        scoreEl.innerHTML = score;
        localStorage.setItem('score',score)
        event.target.reset();
        showQuestion();
}