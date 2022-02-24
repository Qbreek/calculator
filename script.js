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
const buttons = document.querySelectorAll('.number');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.firstNum = Number(button.value);
        console.log(calculator.firstNum)

    });
})