const tg = window.Telegram?.WebApp;

const browserScreen = document.getElementById("browserScreen");
const calculatorScreen = document.getElementById("calculatorScreen");
const telegramButton = document.getElementById("telegramButton");


/* ==========================================
   TELEGRAM MINI APP CHECK
========================================== */

const isTelegram =
    tg &&
    tg.initData &&
    tg.initData.length > 0;


if (isTelegram) {

    // Tell Telegram the Mini App is ready
    tg.ready();

    // Expand the Mini App
    if (tg.expand) {
        tg.expand();
    }

    // Show calculator
    browserScreen.style.display = "none";
    calculatorScreen.style.display = "flex";

} else {

    // Hide calculator
    calculatorScreen.style.display = "none";

    // Show "Open in Telegram"
    browserScreen.style.display = "flex";

    // Your Telegram bot
    telegramButton.href =
        "https://t.me/calculatrmlnlapp_bot";
}


/* ==========================================
   CALCULATOR
========================================== */

let current = "0";
let previous = "";
let operator = null;
let shouldReset = false;


const currentDisplay =
    document.getElementById("current");

const previousDisplay =
    document.getElementById("previous");


/* ==========================================
   UPDATE DISPLAY
========================================== */

function updateDisplay() {

    currentDisplay.textContent = current;

    if (operator && previous !== "") {

        previousDisplay.textContent =
            `${previous} ${displayOperator(operator)}`;

    } else {

        previousDisplay.textContent = "";
    }
}


/* ==========================================
   DISPLAY OPERATORS
========================================== */

function displayOperator(op) {

    if (op === "*") {
        return "×";
    }

    if (op === "/") {
        return "÷";
    }

    if (op === "-") {
        return "−";
    }

    return op;
}


/* ==========================================
   NUMBER BUTTONS
========================================== */

function appendNumber(number) {

    if (
        current === "0" ||
        current === "Error" ||
        shouldReset
    ) {

        current = number;
        shouldReset = false;

    } else {

        current += number;
    }

    updateDisplay();
}


/* ==========================================
   DECIMAL
========================================== */

function appendDecimal() {

    if (current === "Error") {

        clearCalculator();
    }

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


/* ==========================================
   SELECT OPERATOR
========================================== */

function chooseOperator(op) {

    if (current === "Error") {

        clearCalculator();
        return;
    }


    if (operator && !shouldReset) {

        calculate();
    }


    previous = current;
    operator = op;
    shouldReset = true;

    updateDisplay();
}


/* ==========================================
   CALCULATE
========================================== */

function calculate() {

    if (
        !operator ||
        previous === ""
    ) {

        return;
    }


    const a = parseFloat(previous);
    const b = parseFloat(current);

    let result;


    switch (operator) {

        case "+":

            result = a + b;

            break;


        case "-":

            result = a - b;

            break;


        case "*":

            result = a * b;

            break;


        case "/":

            if (b === 0) {

                current = "Error";
                previous = "";
                operator = null;
                shouldReset = true;

                updateDisplay();

                return;
            }

            result = a / b;

            break;
    }


    // Prevent very long decimal results
    current =
        String(Number(result.toFixed(10)));


    previous = "";
    operator = null;
    shouldReset = true;

    updateDisplay();
}


/* ==========================================
   CLEAR EVERYTHING
========================================== */

function clearCalculator() {

    current = "0";
    previous = "";
    operator = null;
    shouldReset = false;

    updateDisplay();
}


/* ==========================================
   BACKSPACE
========================================== */

function deleteNumber() {

    if (
        current === "Error" ||
        shouldReset
    ) {

        clearCalculator();

        return;
    }


    if (current.length > 1) {

        current =
            current.slice(0, -1);

    } else {

        current = "0";
    }


    updateDisplay();
}


/* ==========================================
   PERCENTAGE
========================================== */

function percentage() {

    if (current === "Error") {

        clearCalculator();

        return;
    }


    const number =
        parseFloat(current);


    current =
        String(number / 100);


    updateDisplay();
}


/* ==========================================
   INITIAL DISPLAY
========================================== */

updateDisplay();
