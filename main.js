import compute from "./modules/compute.js";
import updateDisplay from "./modules/updateDisplay.js"
import clearDisplay from "./modules/clearDisplay.js";
import initializeVariables from "./modules/initializeVariables.js";
import appendToStorage from "./modules/appendToStorage.js";
import disableBtn from "./modules/disableBtn.js";
import enableBtn from "./modules/enableBtn.js";

function main () {
    
    let [answer, currentNumber, computeStorage] = initializeVariables();
    const operationScreen = document.querySelector('.operation');    // Displays the operation querry.
    const answerScreen = document.querySelector('.answer');    // Displays the answer.

    // Resets the calculator.
    const allClearBtn = document.querySelector('.all-clear');
    allClearBtn.addEventListener('click', () => {
        
        [answer, currentNumber, computeStorage] = initializeVariables();
        clearDisplay(operationScreen);
        clearDisplay(answerScreen);
        enableBtn(deleteBtn, equalsBtn);

    });

    // Delete numbers and expressions on display AND on computeStorage.
    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {

        operationScreen.textContent = operationScreen.textContent.slice( 0, operationScreen.textContent.length - 1 );    // Slice the input on display.
        
        if ( currentNumber != '' ) {
            
            currentNumber = currentNumber.slice(0, currentNumber.length-1);    // Slice the current number on display.
        
        } else {

            // Current number is currently empty. Check what was last added to the buffer.
            if ( typeof (computeStorage[computeStorage.length - 1]) === 'number' ) {    // If its a number, this becomes the current number.

                currentNumber = String(computeStorage[computeStorage.length-1]);
                currentNumber = currentNumber.slice(0, currentNumber.length-1);    
                computeStorage.pop();    // Pop the last number from computer storage.

            } else {    // If it's an operand , pop the operand from the buffer.
                
                computeStorage.pop();

            };
        };
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
        Convert currentNumber from String to Number and store i-
        -nto computeStorage. Update the display.
    */
    const operandBtn = document.querySelectorAll('.operand');
    operandBtn.forEach(operand => {
        operand.addEventListener('click', () => {

            enableBtn(deleteBtn, equalsBtn);
        
            if ( currentNumber === '') {    // If the user chains operands without a number in between, this will lead to an error.
                
                updateDisplay(operationScreen, operand.value);
                computeStorage.push(operand.value);

            } else if ( answer === null ) {    // Based on the value of the var answer the displays are updated correctly.
                
                updateDisplay(operationScreen, operand.value);
                appendToStorage(computeStorage, Number(currentNumber), operand.value);
                currentNumber = '';

            } else  if ( answer != null ) {

                clearDisplay(operationScreen);
                updateDisplay(operationScreen, answer + operand.value);
                appendToStorage(computeStorage, Number(currentNumber), operand.value);
                currentNumber = '';
                answer = null;

            };
        });
    });

    const equalsBtn = document.querySelector('.equals');
    equalsBtn.addEventListener('click', () => {

        disableBtn(deleteBtn, equalsBtn);
   
        if (currentNumber === '') {

            computeStorage.pop();

        } else {

            computeStorage.push(Number(currentNumber));

        };

        answer = compute(computeStorage);
        currentNumber = answer;
        computeStorage = [];
        
        if ( answerScreen.textContent = '') {
            
            updateDisplay(answerScreen, currentNumber);
            
        } else {
            
            clearDisplay(answerScreen);
            updateDisplay(answerScreen, currentNumber);

        };
    });
};

main();