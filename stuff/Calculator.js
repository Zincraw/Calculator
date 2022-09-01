const allButtonsHtml = document.querySelectorAll('button');
const allNumberButtonsHtml = document.querySelectorAll('.numbers');
const display = document.getElementById('display');

let num1;
let num2;
let operator;
let isMultipleOperationCheck = false;
let result;
let doubleOperation;
let isNumFalse = false;
let isErrorInDisplay = false;

let falseB = false;
let trueB = true;

document.addEventListener("keydown", (event) => 
{
    event.preventDefault();
    var keyValue = event.key;

    if (keyValue == "Escape" || keyValue == "Space") calculatorReset()
    else 
    {        
        if (keyValue == "*" || keyValue == "/" || keyValue == "+" || keyValue == "-" || keyValue == "=" || keyValue == "Enter") 
        {
            clickingOperatorButton(keyValue);            
        }
        if (keyValue == "Control") clickingNegativeButton();
        if ((keyValue >= 0 && keyValue <= 9) || keyValue==",") clickingNumericalButton(keyValue);
    }
});

function countNumbers(num) { return num.replace(/[^0-9]/g, '').length;}  

/*
function setCalculatorButtonStatus(currentOperator) {
    if currentOperator is nothing all unhighlight else just highlight currentOperator;
    if isCommaInDisplay -> comma.desactivate;
}
*/

function clickingNumericalButton(x) 
{
    if(isErrorInDisplay) return;
    let isCommaInDisplay = display.innerHTML.includes(',');
    /*
    if (result != null) 
    {
        display.innerHTML = '0';
        result = null;
    }
    */
    if(x == ',' && !isNumFalse)
    {
        document.getElementById('comma').disabled = true; 
        document.getElementById('comma').style.color = document.getElementById('comma').style.backgroundColor; 
        document.getElementById('comma').style.cursor = 'not-allowed';
    }

    if(isNumFalse)
        {
            display.innerHTML = '';
            if (x == ',')
                display.innerHTML = '0,';
            else 
                display.innerHTML += x;
        }
    else if (display.innerHTML == '0') 
        {
            if(x == ',')        
                display.innerHTML = '0,';
            else
                display.innerHTML = x;  
        }
    else if (countNumbers(display.innerHTML) >= 10) 
        return; 
    else if (isCommaInDisplay && x == ',') 
        return;
    else if (display != '' && operator != null && multipleOperationCheck)
    {
        display.innerHTML = '';
        display.innerHTML += x;
    }
    else 
    {
        display.innerHTML += x; 
        if (countNumbers(display.innerHTML) >= 10) 
        {
            disablingButtonsExceptOperators();
        }
    }
    multipleOperationCheck = false;
    isNumFalse = false;
    setButtonStatus('plusMinus', false);
    setButtonStatus('number0', false);
}

function highlightOperatorButton(buttonId)
{
    buttonId = document.getElementById(changeClass).classList;
    unhighlightOperatorButton();
    changeClass.add("hoverOperator");
}

function unhighlightOperatorButton()
{
    let changeClass = document.getElementsByClassName('operatorButton');
    for (let index = 0; index < changeClass.length; index++) 
    {
        changeClass[index].classList.remove('hoverOperator');
    }
}

function calculatorReset()
{
    setAllButtonsStatus(true);
    setButtonStatus('number0', true);
    setButtonStatus('plusMinus', true);
    unhighlightOperatorButton();
    document.getElementById('display').innerHTML = '0';
    num1 = null;
    num2 = null;
    operator = null;
    result =  null;
    multipleOperationCheck = false;
    isErrorInDisplay = false;
}

function clickingNegativeButton()
{
    if (display.textContent[0] == '-') 
    {
        display.textContent = display.textContent.substring(1, display.textContent.length)
    }
    else if (display.textContent == '0,' || display.textContent == '0')
        return;
    else
        display.textContent = '-' + display.textContent;

}

function setButtonStatus(buttonId, status)
{
    document.getElementById(buttonId).disabled = !status;
    if (!status) 
    {        
        document.getElementById(buttonId).style.color = '#000000'; 
        document.getElementById(buttonId).style.cursor = 'pointer';
    }
    else 
    {        
        document.getElementById(buttonId).style.color = document.getElementById(buttonId).style.backgroundColor; 
        document.getElementById(buttonId).style.cursor = 'not-allowed';
    }
}

function setAllButtonsStatus(status)
{
    allButtonsHtml.forEach(button => setButtonStatus(button.id, !status));
    if (!status) 
    {
        isErrorInDisplay = true;
        setButtonStatus('eraseButton', true);
        display.textContent = 'ERROR';
    }
    else 
    {
        setButtonStatus('eraseButton', true);
    }
}

function setStatusFromZeroToNine(status)
{
        allNumberButtonsHtml.forEach(button => setButtonStatus(button.id, status));
        setButtonStatus('number0', status);
}

function clickingOperatorButton(button)
{
    if(!isErrorInDisplay) 
    {
        if (document.getElementById('display').textContent != 'ERROR') 
        {
            setStatusFromZeroToNine(true);
            if(operator == null && button != '=')
            {
                gettingFirstNumOperation(button);
            }    
            else if (button == '=' && operator != null)
            {
                operationClickingEqual();
            }  
            else if (button == '=' && operator == null) 
            {
                if (display.textContent[display.textContent.length-1] == ',') 
                    display.textContent = display.textContent.substring(0, display.textContent.length-1)

            }
            else if (operator != null && result == null)
            {
                multipleOperationWithoutEqual(button);
            }
            if (isNumFalse) 
            {
                setButtonStatus('plusMinus', true);
            }
        }
    }
    highlightOperatorButton();
}

function gettingFirstNumOperation(button)
{
    operator = button;
    num1 = ConvertToDecimal(display.textContent);
    isNumFalse = true;
}

function operationClickingEqual()
{
    unhighlightOperatorButton();
    num2 = ConvertToDecimal(display.textContent);
    if(isNumFalse) 
    {
        setAllButtonsStatus(false);
        return;
    }
    result = mathematicalOperations(operator);
    
    if(countNumbers(resultDisplay(result)) > 10) 
    {
        setAllButtonsStatus(false);
        return;
    }
    else
        display.textContent = resultDisplay(result)

    isNumFalse = true;
    num1 = null;
    num2 = null;
    operator = null;
    multipleOperationCheck = false;
}

function multipleOperationWithoutEqual(button)
{
    if (isNumFalse) 
    {
        operator = button;
    }
    else
    {
    num2 = ConvertToDecimal(display.textContent); 
    result = mathematicalOperations(operator);

    display.textContent = resultDisplay(result);

    isNumFalse = true;
    num1 = result;
    num2 = null;
    operator = button;
    result = null;
    multipleOperationCheck = true;  
    }
}

function mathematicalOperations(operator)
{
    switch (operator) 
        {
            case '/':
                return num1 / num2;
            case 'x':
                return num1 * num2;
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            default:
                disablingAllButtons();
                return 'ERROR';
        }
}

function ConvertToDecimal(text)
{
    return parseFloat(text.replace(',','.'));
}

function resultDisplay(result)
{
    if(Math.abs(result) > 9999999999) 
    {
        isErrorInDisplay = true;
        disablingAllButtons();
        return 'ERROR';
    }
    if(Math.abs(result) < 0.000000001) return '0';
    if(isNaN(result) || !(result==result))
    {
        isErrorInDisplay = true;
        disablingAllButtons();
        return 'ERROR';
    } 
    console.log(result);
    var length = 10 + (result < 0 ? 1 : 0) + (result.toString().includes('.') ? 1 : 0);
    console.log(result.toFixed(10));
    var partial = result.toFixed(10).replace('.',',').slice(0,length);
    while(HasUnusedDecimalDigits(partial))
    {
       partial = partial.slice(0,partial.length-1);
    } 
   
    return partial; 
    
}

function HasUnusedDecimalDigits(text)
{
    if(!text.includes(',')) return false;
    return text[text.length-1]==',' || text[text.length-1]=='0';
}
