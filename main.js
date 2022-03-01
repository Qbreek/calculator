import compute from "./modules/compute.js";
import {updateDisplay} from "./modules/updateDisplay.js"

function clearDisplay(display) {
    return display.textContent = '';
}

function main () {

    let answer = null;
    let currentNumber = '';
    let computeStorage = [];
    const operationScreen = document.querySelector('.operation');
    const answerScreen = document.querySelector('.answer');

    const allClearBtn = document.querySelector('.all-clear');
    allClearBtn.addEventListener('click', () => {
        answer = null;
        currentNumber = '';
        computeStorage = [];
        operationScreen.textContent = '';
        answerScreen.textContent = '';
    });

    // TODO
    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
    });

    /*  
        Add an event listener to each number of the calculator.
        For every number clicked update the display. Store the-
        user input into the variable currentNumber.
    */

    const numberBtn = document.querySelectorAll('.number');
    numberBtn.forEach(number => {
        number.addEventListener('click', () => {
            
            currentNumber += number.value;
            console.log(currentNumber)
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

    const operandBtn = document.querySelectorAll('.operand');
    operandBtn.forEach(operand => {
        operand.addEventListener('click', () => {
        
            if ( currentNumber === '' && answer === null ) {
                
                updateDisplay(operationScreen, 0 + operand.value);
                computeStorage.push(0);
                computeStorage.push(operand.value);
            
            } else if ( answer === null ) {
                
                updateDisplay(operationScreen, operand.value);
                computeStorage.push(Number(currentNumber));
                computeStorage.push(operand.value);
                currentNumber = '';
                console.log('lathos')

            } else if ( currentNumber === '' && answer != null ) {
                
                operationScreen.textContent = '';
                updateDisplay(operationScreen, 0 + operand.value);
                computeStorage.push(0);
                computeStorage.push(operand.value);
                currentNumber = '';
                answer = null;

            } else if ( currentNumber != '' && answer != null ){

                operationScreen.textContent = '';
                updateDisplay(operationScreen, answer + operand.value);
                computeStorage.push(Number(currentNumber));
                computeStorage.push(operand.value);
                currentNumber = '';
                answer = null;

            };
        });
    });

    const equalsBtn = document.querySelector('.equals');
    equalsBtn.addEventListener('click', () => {
    
        if ( currentNumber === '' ) {
            
            updateDisplay(operationScreen, 0);
            computeStorage.push(0);

        } else {
        
            computeStorage.push(Number(currentNumber));

        };

        currentNumber = compute(computeStorage);
        answer = currentNumber;
        console.log('anser' + answer);
        computeStorage = [];
        console.log(computeStorage);
        
        if (answerScreen.textContent = '') {
            
            updateDisplay(answerScreen, currentNumber);
            
        } else {
            
            answerScreen.textContent = '';
            updateDisplay(answerScreen, currentNumber);

        };

    });
};

main();