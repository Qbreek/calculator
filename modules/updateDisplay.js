
function updateDisplay(display, valueToAppend) {
    return display.textContent += valueToAppend;
};

function clearDisplay(display) {
    return display = '';
}

export default updateDisplay;