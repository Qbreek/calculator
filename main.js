import compute from "./modules/compute.js";
import updateDisplay from "./modules/updateDisplay.js"

function main () {

    let answer = null;
    let currentNumber = '';
    let computeStorage = [];
    const operationScreen = document.querySelector('.operation');
    const answerScreen = document.querySelector('.answer');

    /*  
        Add an event listener to each number of the calculator.
        For every number clicked update the display. Store the-
        user input into the variable currentNumber.
    */

    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            
            currentNumber += number.value;
            updateDisplay(operationScreen, number.value);

        });
    });

    /*  
        Add an event listener to each operand of the calculator.
        If the currentNumber variable is empty, the current inp-
        put was empty, so 0 is assigned. Store 0 to computeStor-
        age. If the currentNumber != empty convert to Number and
        store into computeStorage. Update the display.
    */

    const operands = document.querySelectorAll('.operand');
    operands.forEach(operand => {
        operand.addEventListener('click', () => {
        
            if( currentNumber === '' && answer === null ) {
                
                updateDisplay(operationScreen, 0 + operand.value);
                computeStorage.push(0);
                computeStorage.push(operand.value);
                console.log(computeStorage);

            } else if ( answer === null ) {

                updateDisplay(operationScreen,operand.value)
                computeStorage.push(Number(currentNumber));
                computeStorage.push(operand.value);
                currentNumber = '';
                console.log(computeStorage);

            } else {
                
                operationScreen.textContent = '';
                updateDisplay(operationScreen, answer + operand.value);
                computeStorage.push(Number(currentNumber));
                computeStorage.push(operand.value);
                console.log(computeStorage);

            }
        });
    });

    const equals = document.querySelector('.equals');
    equals.addEventListener('click', () => {
    
        if( currentNumber === '' ) {
            
            updateDisplay(operationScreen, 0);
            computeStorage.push(0);

        } else {
        
            computeStorage.push(Number(currentNumber));

        };

        answer = compute(computeStorage);
        currentNumber = answer;
        computeStorage = [];
        
        if (answerScreen.textContent = '') {
            
            updateDisplay(answerScreen, answer);

        } else {
            
            answerScreen.textContent = '';
            updateDisplay(answerScreen, answer);
        }

    });
};

main();