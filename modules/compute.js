/*
    Imagine the given array :
        
        [15, '+', 18, '*', 31]

    which represents the computeStorage buffer.

    From left to right, the compute() function will parse the array -
    locate the index of the multiplication symbol in the array, on  -
    the example array index = 3, multiply the first and second num  -
    18 and 31, index - 1 and index + 1 respectively, remove 18, '*',-
    and 31' from the array and replace them with the result.
*/

function compute (computeStorage) {

    let i = 0, result;
    
    while (computeStorage.length != 1) {
        
        const indexOfOpeningPar = computeStorage.indexOf('(');
        const indexOfClosingPar = computeStorage.indexOf(')');
        const indexOfMult = computeStorage.indexOf('*');
        const indexOfDiv = computeStorage.indexOf('/');

        if (computeStorage[0] === '-') {

            computeStorage.splice(0,2,-computeStorage[1]);
        
        }else if (typeof computeStorage[0] != 'number') {

            return 'Error';
        };

        if (indexOfOpeningPar === -1 && indexOfClosingPar === -1) {

            if (indexOfMult === -1 && indexOfDiv === -1) {    // No division or multiplication found in computeStorage. Add from left to right.
                
                switch (computeStorage[i+1]) {
                    
                    case '+' :
                        
                        result = add(computeStorage[i], computeStorage[i+2]);
                        break;
                        
                    case '-' :
                        
                        result = add(computeStorage[i], -computeStorage[i+2]);
                        break;
                };
                    
                computeStorage.splice(i, 3, result);
                        
            } else if (indexOfMult === -1 && indexOfDiv != -1) {    // Only divisions found in computeStorage.
                
                i = indexOfDiv;
                
                switch (computeStorage[i+1]) {
                    
                    case '-' :    // Convert to negative
                    
                        result = divide(computeStorage[i-1], -computeStorage[i+2]);
                        computeStorage.splice(i-1 , 4, result);
                        break;
                    
                    default :
                
                        result = divide(computeStorage[i-1], computeStorage[i+1])
                        computeStorage.splice(i-1 , 3, result);
                        break;
                };
                
            } else if (indexOfDiv === -1  && indexOfMult != -1) {    // Only multiplications found in computeStorage.
                
                i = indexOfMult;
                
                switch (computeStorage[i+1]) {
                    
                    case '-' :    // Convert to negative
                    
                        result = multiply(computeStorage[i-1], -computeStorage[i+2]);
                        computeStorage.splice(i-1 , 4, result);
                        break;
                    
                    default :
                    
                        result = multiply(computeStorage[i-1], computeStorage[i+1]);
                        computeStorage.splice(i-1 , 3, result);
                        break;
                };
                
            } else if (indexOfMult < indexOfDiv) {    // Both multiplications and divisions found in computeStorage. From left to right mult is first.
                
                i = indexOfMult;
                
                switch (computeStorage[i+1]) {
    
                    case '-' :    // Convert to negative
                    
                        result = multiply(computeStorage[i-1], -computeStorage[i+2]);
                        computeStorage.splice(i-1 , 4, result);
                        break;
                    
                    default :
                    
                        result = multiply(computeStorage[i-1], computeStorage[i+1]);
                        computeStorage.splice(i-1 , 3, result);
                        break;
                };
                
            } else {    // Div comes first, operate div first.
                
                i = indexOfDiv;
    
                switch (computeStorage[i+1]) {
                    
                    case '-' :    // Convert to negative
                    
                        result = divide(computeStorage[i-1], -computeStorage[i+2]);
                        computeStorage.splice(i-1 , 4, result);
                        break;
                    
                    default :
                    
                        result = divide(computeStorage[i-1], computeStorage[i+1])
                        computeStorage.splice(i-1 , 3, result);
                        break;
                };
            };
        
        } else {

                // TODO tommorow.
                let expressionInsidePar = computeStorage.slice(indexOfOpeningPar + 1, indexOfClosingPar);
                console.log(expressionInsidePar);
                let resultOfPar = compute(expressionInsidePar);
                computeStorage.splice(indexOfOpeningPar, indexOfClosingPar - 1, resultOfPar);
        };
        
        console.log(computeStorage);
        i = 0;
    };

    if (isNaN(result)) {

        return 'Error';
    };
    
    return result; 
};

// Basic operations.
const add = (a, b) => a + b ;

const multiply = (a, b) => a *b ;

const divide = (a, b) => {
    
    if ( b != 0 ) {

        return a / b;
    };

    return 'Error';
};

export default compute;