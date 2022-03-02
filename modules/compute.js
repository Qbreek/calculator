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

    let i = 0, result 
    
    while (computeStorage.length != 1) {    
        
        if (typeof computeStorage[i+2] != 'number') {
            
            if (computeStorage[i+1] === '*' && computeStorage[i+2] === '-' || computeStorage[i+1] === '/' && computeStorage[i+2] === '-') {
                
                computeStorage.splice(i+2, 2, -computeStorage[i+3]);
                
            } else {
                
                return 'Error';
                
            };
        };
     
        const indexOfMult = computeStorage.indexOf('*');
        const indexOfDiv = computeStorage.indexOf('/');
        
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

        i = 0;
    };
    
    return result; 
    
};

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
};

function divide(firstNumber, secondNumber) {
    if (secondNumber != 0) {
        return firstNumber / secondNumber;
    }else {
        return 'Error';
    }
};

export default compute;