let currentNumber = '';
let buffer = [];
const screen = document.querySelector('.screen');

/*  Add an event listener to each number of the calculator.
    For every number clicked update the display.
    Store the user input into the variable currentNumber.
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
    put was empty, so 0 is assigned. Store 0 to buffer.
    If the currentNumber != empty convert to Number() and s-
    tore into buffer.
    Update the display accordingly.
*/

const operands = document.querySelectorAll('.operand');
operands.forEach(operand => {
    operand.addEventListener('click', () => {
       
        if(currentNumber === '') {
            
            screen.textContent += 0 + operand.value;
            buffer.push(0);
            buffer.push(operand.value);
            console.log(buffer);

        }else {
            
            buffer.push(Number(currentNumber));
            buffer.push(operand.value);
            console.log(buffer)
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
        buffer.push(0);

    }else {
       
        buffer.push(Number(currentNumber));
        screen.textContent += '=';
        console.log(buffer);

    };

    i = 0;

    while ( buffer.length != 1 ) {
        


        if ( buffer[i+1] === '+' ) {
            
            result = buffer[i] + buffer[i+2];
            buffer.splice(i, 3, result);
            console.log(buffer);

        }else if ( buffer[i+1] === '-') {
            
            result = buffer[i] - buffer[i+2];
            buffer.splice(i, 3, result);
            console.log(buffer);
        
        }else if ( buffer[i+1] === '*') {

            result = buffer[i] * buffer[i+2];
            buffer.splice(i, 3, result);
            console.log(buffer);        
        
        }else if ( buffer[i+1] === '/') {

            if ( buffer[i+2] === 0 ) {
                
                console.log('cant divide with zero');
                break;
        
            }else {
                
                result = buffer[i] / buffer[i+2];
                buffer.splice(i, 3, result);
                console.log(buffer);
                
            };
        };
    };

    console.log('ends');

});


