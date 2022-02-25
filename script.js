function updateDisplay (display, valueToAppend) {
    return display.textContent += valueToAppend;
}

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
       
        if( currentNumber === '' ) {
            
            updateDisplay(operationScreen, 0 + operand.value);
            computeStorage.push(0);
            computeStorage.push(operand.value);

        } else {
            
            updateDisplay(operationScreen, operand.value);
            computeStorage.push(Number(currentNumber));
            computeStorage.push(operand.value);
            currentNumber = '';

        };
    });
});

let result;

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {

    console.log(computeStorage);
   
    if( currentNumber === '' ) {
        
        updateDisplay(operationScreen, 0);
        computeStorage.push(0);

    } else {
       
        computeStorage.push(Number(currentNumber));
        console.log(computeStorage);

    };

    let i = 0;

    while ( computeStorage.length != 1 ) {
        
        indexOfMult = computeStorage.indexOf('*');
        indexOfDiv = computeStorage.indexOf('/');

        if (indexOfMult === -1 && indexOfDiv === -1) {    // No division or multiplication found in computeStorage. Add from left to right.
            
            if ( computeStorage[i+1] === '+' ) {
                
                result = computeStorage[i] + computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
    
            } else if ( computeStorage[i+1] === '-') {
                
                result = computeStorage[i] - computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
            
            };
        
        } else {

            if ( indexOfMult === -1 ) {    // Only divisions found in computeStorage.

                if ( indexOfDiv != -1 ) {    // There is at least one division in computeStorage.

                    i = indexOfDiv;
                    result = computeStorage[i-1] / computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);
                
                };
            
            } else if (indexOfDiv === -1 ) {    // Only multiplications found in computeStorage.

                if ( indexOfMult != -1 ) {    // There is at least one multiplication in computeStorage.
                    i = indexOfMult;
                    result = computeStorage[i-1] * computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);
                
                };
            
            } else {    // Both multiplications and divisions found in computeStorage.

                if ( indexOfMult < indexOfDiv ) {    // If index of mult is smaller than index of div operate mult first.
                    i = indexOfMult;
                    result = computeStorage[i-1] * computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);

                } else {    // Div comes first, operate div first.

                    i = indexOfDiv;
                    result = computeStorage[i-1] / computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);

                };
            };
        };
        
        i = 0;
        console.log('ends');
    };
    answerScreen.textContent = computeStorage[0];
    currentNumber = computeStorage;
});
