let current = "0";
let previous = "";
let operator = null;
let shouldReset = false;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");

function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent =
        operator && previous !== ""
            ? `${previous} ${displayOperator(operator)}`
            : "";
}

function displayOperator(op) {
    if (op === "*") return "×";
    if (op === "/") return "÷";
    if (op === "-") return "−";
    return op;
}

function appendNumber(number) {
    if (current === "0" || shouldReset) {
        current = number;
        shouldReset = false;
    } else {
        current += number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (shouldReset) {
        current = "0.";
        shouldReset = false;
        updateDisplay();
        return;
    }

    if (!current.includes(".")) {
        current += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (operator && !shouldReset) {
        calculate();
    }

    previous = current;
    operator = op;
    shouldReset = true;

    updateDisplay();
}

function calculate() {
    if (!operator || previous === "") return;

    const a = parseFloat(previous);
    const b = parseFloat(current);

    let result;

    if (operator === "+") {
        result = a + b;
    }

    if (operator === "-") {
        result = a - b;
    }

    if (operator === "*") {
        result = a * b;
    }

    if (operator === "/") {
        if (b === 0) {
            current = "Error";
            previous = "";
            operator = null;
            shouldReset = true;
            updateDisplay();
            return;
        }

        result = a / b;
    }

    current = String(
        Number(result.toFixed(10))
    );

    previous = "";
    operator = null;
    shouldReset = true;

    updateDisplay();
}

function clearCalculator() {
    current = "0";
    previous = "";
    operator = null;
    shouldReset = false;

    updateDisplay();
}

function deleteNumber() {
    if (shouldReset || current === "Error") {
        clearCalculator();
        return;
    }

    current =
        current.length > 1
            ? current.slice(0, -1)
            : "0";

    updateDisplay();
}

function percentage() {
    current = String(parseFloat(current) / 100);
    updateDisplay();
}
