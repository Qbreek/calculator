// Appends values to compute storage each time an operand is pressed. Number comes first then the operand.

function appendToStorage(computeStorage, number, operand) {
    
    computeStorage.push(number);
    computeStorage.push(operand);
    console.log(computeStorage);
    return computeStorage;

};

export default appendToStorage;

