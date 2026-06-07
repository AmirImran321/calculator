function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        return "Error: dividing by zero? Bold move.";
    }
    return a / b;
}

let firstNum = "";
let secondNum = "";
let operator = "";
let resultDisplayed = false;

function operation(firstNum, secondNum, operator) {
    firstNum = parseFloat(firstNum);
    secondNum = parseFloat(secondNum);
    let result;
    switch (operator) {
        case '+': result = add(firstNum, secondNum); break;
        case '-': result = subtract(firstNum, secondNum); break;
        case '*': result = multiply(firstNum, secondNum); break;
        case '/': result = divide(firstNum, secondNum); break;
        default: return "Error: Invalid operator";
    }
   
    if (typeof result === "number") {
        result = parseFloat(result.toFixed(6));
    }
    return result;
}

function updateDisplay() {
    const digits = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');
    const backspace = document.getElementById('backspace');
    const display = document.getElementById('display');

    digits.forEach(digit => {
        digit.addEventListener('click', () => {
            if (resultDisplayed) {
                // start fresh after showing a result
                firstNum = "";
                secondNum = "";
                operator = "";
                resultDisplayed = false;
            }
            if (operator === "") {
                firstNum += digit.textContent;
                display.textContent = firstNum;
            } else {
                secondNum += digit.textContent;
                display.textContent = secondNum;
            }
        });
    });

    operators.forEach(op => {
        op.addEventListener('click', () => {
            if (firstNum !== "" && secondNum === "") {
                // consecutive operator → just replace
                operator = op.textContent;
                display.textContent = firstNum + " " + operator;
            } else if (firstNum !== "" && secondNum !== "") {
                const result = operation(firstNum, secondNum, operator);
                display.textContent = result;
                firstNum = result.toString();
                secondNum = "";
                operator = op.textContent; // carry forward new operator
                resultDisplayed = false;
            }
        });
    });

    equals.addEventListener('click', () => {
        if (firstNum !== "" && secondNum !== "" && operator !== "") {
            const result = operation(firstNum, secondNum, operator);
            display.textContent = result;
            firstNum = result.toString();
            secondNum = "";
            operator = "";
            resultDisplayed = true;
        }
    });

    clear.addEventListener('click', () => {
        firstNum = "";
        secondNum = "";
        operator = "";
        display.textContent = "0";
        resultDisplayed = false;
    });

    backspace.addEventListener('click', () => {
        if (operator === "") {
            firstNum = firstNum.slice(0, -1);
            display.textContent = firstNum || "0";
        } else {
            secondNum = secondNum.slice(0, -1);
            display.textContent = secondNum || "0";
        }
    });
}

updateDisplay();