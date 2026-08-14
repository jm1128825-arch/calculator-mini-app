const tg = window.Telegram.WebApp;

tg.ready();

function calculate(operator){

    let a = Number(document.getElementById("num1").value);
    let b = Number(document.getElementById("num2").value);

    let answer = 0;

    switch(operator){

        case "+":
            answer = a + b;
            break;

        case "-":
            answer = a - b;
            break;

        case "*":
            answer = a * b;
            break;

        case "/":
            if(b === 0){
                answer = "Cannot divide by zero";
            }else{
                answer = a / b;
            }
            break;
    }

    document.getElementById("result").innerHTML =
        "Result: " + answer;
}
