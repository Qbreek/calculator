import compute from "./modules/compute.js";
import updateDisplay from "./modules/updateDisplay.js"
import clearDisplay from "./modules/clearDisplay.js";
import initializeVariables from "./modules/initializeVariables.js";
import appendToStorage from "./modules/appendToStorage.js";

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

    });

    // TODO
    const deleteBtn = document.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {

        operationScreen.textContent = operationScreen.textContent.slice(0, operationScreen.textContent.length - 1 );
        
        if ( currentNumber != '' ) {
            
            currentNumber = currentNumber.slice(0, currentNumber.length-1);
            console.log(currentNumber);
        
        } else {

            if ( typeof (computeStorage[computeStorage.length - 1]) === 'number' ) {

                currentNumber = String(computeStorage[computeStorage.length-1]);
                console.log(currentNumber);

            } else {
                
                computeStorage.pop();
                console.log(computeStorage);
                console.log('operand');

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
                appendToStorage(computeStorage, 0, operand.value);

            } else if ( answer === null ) {
                
                updateDisplay(operationScreen, operand.value);
                appendToStorage(computeStorage, Number(currentNumber), operand.value);
                currentNumber = '';

            } else if ( currentNumber === '' && answer != null ) {
                
                clearDisplay(operationScreen);
                updateDisplay(operationScreen, 0 + operand.value);
                appendToStorage(computeStorage, 0, operand.value);
                answer = null;

            } else if ( currentNumber != '' && answer != null ){

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
    
   
        if (currentNumber != '') {

            computeStorage.push(Number(currentNumber));

        } else {

            computeStorage.pop();
            console.log(computeStorage);
        }


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