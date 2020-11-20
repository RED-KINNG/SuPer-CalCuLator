const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and SECOND VALUES DEPENDING ON OPERATORS
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue ='';
let awaitingNextValue = false;

function sendNumberValue(number) {
//    REPLACE CURRENT DISPLAY VALUE IF FIRST VALUE IS ENTERED
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
         // If current display value is 0, replace it. If not ADD number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue  + number;
    }
}

function addDecimal() {
    // IF OPERATOR is PRESSED, dont ADD DECIMAL
    if(awaitingNextValue) return;

    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = ` ${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // PREVENT MULTIPLE OPERATORS
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign firstValue if No Value
    if(!firstValue) {
        firstValue = currentValue;
    } else {
        
        const calculation = calculate[operatorValue] (firstValue, currentValue);
        calculatorDisplay.textContent = calculation
        firstValue = calculation;
    }
    // Ready for the Next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    
}

// RESET all VALUES, DISPLAY

function resetAll() {
    firstValue = 0;
    operatorValue ='';
    awaitingNextValue = false;
    calculatorDisplay.textContent ='0';
}

// ADD EVENT LISTENERS FOR NUMBERS, OPERATORS, DECIMAL BUTTONS
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () =>  sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () =>  useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () =>  addDecimal());
    } 
})

// EVENT LISTENER
clearBtn.addEventListener('click', resetAll);