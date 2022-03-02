function compute (computeStorage) {

    let i = 0;
    let result;
    console.log(computeStorage);
    
    while ( computeStorage.length != 1 ) {    
        
        if ( typeof computeStorage[i+2] != 'number' ) {

            if ( computeStorage[i+1] === '*' && computeStorage[i+2] === '-' || computeStorage[i+1] === '/' && computeStorage[i+2] === '-' ) {
                
                computeStorage.splice(i+2, 2, -computeStorage[i+3]);

            } else {

                return 'Error';

            };
        };

        let indexOfMult = computeStorage.indexOf('*');
        let indexOfDiv = computeStorage.indexOf('/');
        let indexOfOpeningParenthesis = computeStorage.indexOf('(');
        let indeOfClosingParenthesis = computeStorage.indexOf(')');

        if (indexOfMult === -1 && indexOfDiv === -1 && indexOfOpeningParenthesis === -1 && indeOfClosingParenthesis === -1 ) {    // No division or multiplication found in computeStorage. Add from left to right.
            
            if ( computeStorage[i+1] === '+' ) {
                
                result = computeStorage[i] + computeStorage[i+2];
                computeStorage.splice(i, 3, result);
    
            } else if ( computeStorage[i+1] === '-') {
                
                result = computeStorage[i] - computeStorage[i+2];
                computeStorage.splice(i, 3, result);
            
            };
        
        } else {

            if ( indexOfMult === -1 ) {    // Only divisions found in computeStorage.

                if ( indexOfDiv != -1 ) {    // There is at least one division in computeStorage.

                    i = indexOfDiv;

                    if (computeStorage[i+1] === '-') {    // Convert to negative number

                        result = computeStorage[i-1] / ( -computeStorage[i+2] );
                        computeStorage.splice(i-1 , 4, result);

                    } else {

                        result = computeStorage[i-1] / computeStorage[i+1];
                        computeStorage.splice(i-1 , 3, result);
                                            
                    };
                
                };
            
            } else if (indexOfDiv === -1 ) {    // Only multiplications found in computeStorage.

                if ( indexOfMult != -1 ) {    // There is at least one multiplication in computeStorage.
                   
                    i = indexOfMult;

                    if (computeStorage[i+1] === '-') {    // Convert to negative number

                        result = computeStorage[i-1] * ( -computeStorage[i+2] );
                        computeStorage.splice(i-1 , 4, result);

                    } else {

                        result = computeStorage[i-1] * computeStorage[i+1];
                        computeStorage.splice(i-1 , 3, result);
                                            
                    };
                };
            
            } else {    // Both multiplications and divisions found in computeStorage.

                if ( indexOfMult < indexOfDiv ) {    // If index of mult is smaller than index of div operate mult first.
                  
                    i = indexOfMult;

                    if (computeStorage[i+1] === '-') {    // Convert to negative number

                        result = computeStorage[i-1] * ( -computeStorage[i+2] );
                        computeStorage.splice(i-1 , 4, result);

                    } else {

                        result = computeStorage[i-1] * computeStorage[i+1];
                        computeStorage.splice(i-1 , 3, result);
                                            
                    };


                } else {    // Div comes first, operate div first.

                    i = indexOfDiv;

                    if (computeStorage[i+1] === '-') {    // Convert to negative number

                        result = computeStorage[i-1] / ( -computeStorage[i+2] );
                        computeStorage.splice(i-1 , 4, result);

                    } else {

                        result = computeStorage[i-1] / computeStorage[i+1];
                        computeStorage.splice(i-1 , 3, result);
                                            
                    };

                };
            };
        };
        
        i = 0;

    };
    
    return result; 
    
};

export default compute;