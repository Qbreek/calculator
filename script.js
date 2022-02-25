let currentNumber = '';
let computeStorage = [];
const operationScreen = document.querySelector('.operation');
const answerScreen = document.querySelector('.answer');

/*  Add an event listener to each number of the calculator.
    For every number clicked update the display. Store the-
    user input into the variable currentNumber.
*/
const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        
        currentNumber += number.value;
        operationScreen.textContent += number.value;
    });
});

/*  Add an event listener to each operand of the calculator.
    If the currentNumber variable is empty, the current inp-
    put was empty, so 0 is assigned. Store 0 to computeStor-
    age. If the currentNumber != empty convert to Number and
    store into computeStorage. Update the display.
*/
const operands = document.querySelectorAll('.operand');
operands.forEach(operand => {
    operand.addEventListener('click', () => {
       
        if( currentNumber === '' ) {
            
            operationScreen.textContent += 0 + operand.value;
            computeStorage.push(0);
            computeStorage.push(operand.value);

        } else {
            
            operationScreen.textContent += operand.value;
            computeStorage.push(Number(currentNumber));
            computeStorage.push(operand.value);
            currentNumber = '';

        };
    });
});


let result;

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
   
    if( currentNumber === '' ) {
        
        operationScreen.textContent += 0
        computeStorage.push(0);

    } else {
       
        computeStorage.push(Number(currentNumber));
        console.log(computeStorage);

    };

    let i = 0;

    while ( computeStorage.length != 1 ) {
        
        indexOfMult = computeStorage.indexOf('*');
        indexOfDiv = computeStorage.indexOf('/');

        /*  No division or multiplication found in compute-
            Storage. Add from left to right. 
        */
        if (indexOfMult === -1 && indexOfDiv === -1) {
            
            if ( computeStorage[i+1] === '+' ) {
                
                result = computeStorage[i] + computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
    
            } else if ( computeStorage[i+1] === '-') {
                
                result = computeStorage[i] - computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
            
            };
        
        // Multiplication
        } else {

            // case with only /.
            if ( indexOfMult === -1 ) {

                if ( indexOfDiv != -1 ) {

                    i = indexOfDiv;
                    result = computeStorage[i-1] / computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);
                
                };
            
            // case with only *.
            } else if (indexOfDiv === -1 ) {

                if ( indexOfMult != -1 ) {
                    i = indexOfMult;
                    result = computeStorage[i-1] * computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);
                
                };
            
            // case with both div and mult
            } else {

                if ( indexOfMult < indexOfDiv ) {

                    i = indexOfMult;
                    result = computeStorage[i-1] * computeStorage[i+1];
                    computeStorage.splice(i-1 , 3, result);
                    console.log(computeStorage);

                } else {

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
});
