const display = document.getElementById("display");
const previousDisplay = document.getElementById("previous-display");

let expression = "";
let calculated = false;


// Add value to display
function appendValue(value) {

    if (calculated) {
        expression = "";
        calculated = false;
    }

    // Prevent multiple decimal points
    if (value === ".") {

        const lastNumber = expression.split(/[+\-*/]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }
    }

    // Prevent two operators together
    if ("+-*/".includes(value)) {

        if (expression === "") {
            return;
        }

        const lastCharacter = expression.slice(-1);

        if ("+-*/".includes(lastCharacter)) {
            expression = expression.slice(0, -1);
        }
    }

    expression += value;

    display.value = expression;
}


// Clear calculator
function clearDisplay() {

    expression = "";
    display.value = "0";
    previousDisplay.textContent = "";
    calculated = false;
}


// Delete last character
function deleteLast() {

    if (calculated) {
        clearDisplay();
        return;
    }

    expression = expression.slice(0, -1);

    display.value = expression || "0";
}


// Percentage
function percentage() {

    if (expression === "") {
        return;
    }

    try {

        const result = eval(expression) / 100;

        previousDisplay.textContent = expression + "%";

        expression = result.toString();

        display.value = expression;

        calculated = true;

    } catch {
        display.value = "Error";
        expression = "";
    }
}


// Calculate result
function calculate() {

    if (expression === "") {
        return;
    }

    try {

        const lastCharacter = expression.slice(-1);

        if ("+-*/".includes(lastCharacter)) {
            expression = expression.slice(0, -1);
        }

        const result = eval(expression);

        previousDisplay.textContent = expression + " =";

        display.value = Number.isFinite(result)
            ? result
            : "Error";

        expression = result.toString();

        calculated = true;

    } catch {

        display.value = "Error";
        expression = "";
    }
}


// Keyboard support
document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "." ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        appendValue(key);

    } else if (key === "Enter" || key === "=") {

        calculate();

    } else if (key === "Backspace") {

        deleteLast();

    } else if (key === "Escape") {

        clearDisplay();

    } else if (key === "%") {

        percentage();
    }

});
