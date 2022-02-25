let currentNumber = '';
let computeStorage = [];
const screen = document.querySelector('.screen');

/*  Add an event listener to each number of the calculator.
    For every number clicked update the display. Store the-
    user input into the variable currentNumber.
*/

const numbers = document.querySelectorAll('.number');
numbers.forEach(number => {
    number.addEventListener('click', () => {
        
        currentNumber += number.value;
        screen.textContent += number.value;
    });
});

/*  Add an event listener to each operand of the calculator.
    If the currentNumber variable is empty, the current inp-
    put was empty, so 0 is assigned. Store 0 to computeStor-
    age.If the currentNumber != empty convert to Number and-
    store into computeStorage.Update the display accordingly
*/

const operands = document.querySelectorAll('.operand');
operands.forEach(operand => {
    operand.addEventListener('click', () => {
       
        if(currentNumber === '') {
            
            screen.textContent += 0 + operand.value;
            computeStorage.push(0);
            computeStorage.push(operand.value);
            console.log(computeStorage);

        }else {
            
            computeStorage.push(Number(currentNumber));
            computeStorage.push(operand.value);
            console.log(computeStorage)
            screen.textContent += operand.value;
            currentNumber = '';

        };
    });
});

let firstNumber,secondNumber;

let result;

const equals = document.querySelector('.equals');
equals.addEventListener('click', () => {
   
    if(currentNumber === '') {
        
        screen.textContent += 0 + '=';
        computeStorage.push(0);

    }else {
       
        computeStorage.push(Number(currentNumber));
        screen.textContent += '=';
        console.log(computeStorage);

    };

    i = 0;

    while ( computeStorage.length != 1 ) {
        
        if ( computeStorage.includes('*') || computeStorage.includes('/') ) {

            indexOfMult = computeStorage.indexOf('*');
            indexOfDiv = computeStorage.indexOf('/');
            console.log(indexOfDiv);
            console.log(indexOfMult);
            
            if ( (indexOfMult < indexOfDiv) && (indexOfMult != -1) ) {
                
                i = computeStorage.indexOf('*');
                console.log(i);
                result = computeStorage[i-1] * computeStorage[i+1];
                computeStorage.splice(i-1 , 3, result);
                console.log(computeStorage);
                i = 0;
    
            } else if ( indexOfMult > indexOfDiv && indexOfDiv != -1 && indexOfMult != -1) {
               
                i = computeStorage.indexOf('/');
                console.log(i);
                result = computeStorage[i-1] / computeStorage[i+1];
                computeStorage.splice(i-1 , 3, result);
                console.log(computeStorage); 
                i = 0;
            }

        } else {
            
            if ( computeStorage[i+1] === '+' ) {
                
                result = computeStorage[i] + computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
    
            }else if ( computeStorage[i+1] === '-') {
                
                result = computeStorage[i] - computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);
            
            }else if ( computeStorage[i+1] === '*') {
    
                result = computeStorage[i] * computeStorage[i+2];
                computeStorage.splice(i, 3, result);
                console.log(computeStorage);        
            
            }else if ( computeStorage[i+1] === '/') {
    
                if ( computeStorage[i+2] === 0 ) {
                    
                    console.log('cant divide with zero');
                    break;
            
                }else {
                    
                    result = computeStorage[i] / computeStorage[i+2];
                    computeStorage.splice(i, 3, result);
                    console.log(computeStorage);
                    
                };
            };
        };  
    };

    console.log('ends');

});


