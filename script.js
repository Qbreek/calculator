function Calculator (firstNum, secondNum, operand) {
    this.firstNum = firstNum;
    this.secondNum = secondNum;
    this.operand = operand;
    
    this.add = function () {
        return firstNum + secondNum;
    };
    
    this.mult = function () {
        return firstNum * secondNum;
    };

    this.divide = function () {
        if (secondNum === 0) {
            return 'Infinity';
        }else{
            return firstNum / secondNum;
        };
    };

    this.compute = function () {
        if (this.operand === '+') {
            return this.add();
        }else if (this.operand === '*') {
            return this.mult();
        }else if (this.operand === '/') {
            return this.divide();
        }
    };
};

const calculator = new Calculator();

let userInput = '';

const screen = document.querySelector('#screen');

const buttons = document.querySelectorAll('.number');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        userInput += button.value;
        screen.textContent = userInput;
    });
});

const operands = document.querySelectorAll('.operand');
operands.forEach(operand => {
    operand.addEventListener('click', () => {
        screen.textContent = '';
        calculator.operand = operand.value;
        if (calculator.firstNum === 0) {
            calculator.firstNum = Number(userInput);
            userInput = '';
        }else if (calculator.secondNum === 0) {
            calculator.secondNum = Number(userInput);
            userInput = '';
        }
    });
});

const equals = document.querySelector('#equals');

equals.addEventListener('click', () => {
    screen.textContent = calculator.compute();
});

