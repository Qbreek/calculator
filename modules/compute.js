function compute (computeStorage) {

    let i = 0;
    let result;
    
    while ( computeStorage.length != 1 ) {    
        
        let indexOfMult = computeStorage.indexOf('*');
        let indexOfDiv = computeStorage.indexOf('/');
        let indexOfOpeningParenthesis = computeStorage.indexOf('(');
        let indeOfClosingParenthesis = computeStorage.indexOf(')');

        if (indexOfMult === -1 && indexOfDiv === -1 && indexOfOpeningParenthesis === -1 && indeOfClosingParenthesis === -1 ) {    // No division or multiplication found in computeStorage. Add from left to right.
            
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

    return computeStorage; 
};

export default compute;