const allButtonsHtml = document.querySelectorAll('button');
const allNumberButtonsHtml = document.querySelectorAll('.numbers');

let num1;
let num2;
let operator = null;
let multipleOperationCheck = false;
let result;
let doubleOperation;
let numFalse = false;
let errorBool = false;

document.addEventListener("keydown", (event) => {
    event.preventDefault();
    var keyValue = event.key;
    
    if (keyValue == "Escape" || keyValue == "Space") calculatorReset('0');
    if (keyValue == "," || keyValue == ".") getNumericValueClickingButton(",");
    if (keyValue == "*") 
    {
        clickingOperationButtons('x')
        highlightOperatorButton(document.getElementById('multiplication').classList);
    }
    if (keyValue == "+")  
    {
        clickingOperationButtons('+')
        highlightOperatorButton(document.getElementById('add').classList);
    }
    if (keyValue == "-")
    {
        clickingOperationButtons('-')
        highlightOperatorButton(document.getElementById('substract').classList);
    }
    if (keyValue == "/")
    {
        clickingOperationButtons('/')
        highlightOperatorButton(document.getElementById('division').classList);
    }
    if (keyValue == "=" || keyValue == "Enter") clickingOperationButtons('=')
    if (keyValue == "Control") changeToNegativeOrPositiveButton('-1')
    if (keyValue >= 0 && keyValue <= 9) 
    {
       getNumericValueClickingButton(keyValue);
    }

});

function countNumbers(num) { return num.replace(/[^0-9]/g, '').length;}

function getNumericValueClickingButton(x) 
{
    if(errorBool) return;
    let displayInfo = document.getElementById('display');
    let commaChecker = displayInfo.innerHTML.includes(',');
    if (result != null) 
    {
        displayInfo.innerHTML = '0';
        result = null;
    }
    if(x == ',' && !numFalse)
        {
        document.getElementById('comma').disabled = true; 
        document.getElementById('comma').style.color = document.getElementById('comma').style.backgroundColor; 
        document.getElementById('comma').style.cursor = 'not-allowed';
        }

    if(numFalse)
        {
            displayInfo.innerHTML = '';
            if (x == ',')
                displayInfo.innerHTML = '0,';
            else 
                displayInfo.innerHTML += x;
        }
    else if (displayInfo.innerHTML == '0') 
        {
            if(x == ',')        
                displayInfo.innerHTML = '0,';
            else
                displayInfo.innerHTML = x;  
        }
    else if (countNumbers(displayInfo.innerHTML) >= 10) 
        return; 
    else if (commaChecker && x == ',') 
        return;
    else if (displayInfo != '' && operator != null && multipleOperationCheck)
    {
        displayInfo.innerHTML = '';
        displayInfo.innerHTML += x;
    }
    else 
    {
        displayInfo.innerHTML += x; 
        if (countNumbers(displayInfo.innerHTML) >= 10) 
        {
            disablingButtonsExceptOperators();
        }
    }
    multipleOperationCheck = false;
    numFalse = false;
    enablingNegativeOrPositiveButton();
    enablingButton0();
    
}

function highlightOperatorButton(changeClass)
{
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

function calculatorReset(x)
{
    enablingAllButtons();
    disablingButton0();
    disablingNegativeOrPositiveButton();
    unhighlightOperatorButton();
    document.getElementById('display').innerHTML = x;
    num1 = null;
    num2 = null;
    operator = null;
    result =  null;
    multipleOperationCheck = false;
    errorBool = false;
}

function changeToNegativeOrPositiveButton()
{
    let display = document.getElementById('display');
    if (display.textContent[0] == '-') 
    {
        display.textContent = display.textContent.substring(1, display.textContent.length)
    }
    else if (display.textContent == '0,' || display.textContent == '0')
        return;
    else
        display.textContent = '-' + display.textContent;

}

function disablingButton0()
{
    document.getElementById('number0').disabled = true; document.getElementById('number0').style.color = document.getElementById('number0').style.backgroundColor; document.getElementById('number0').style.cursor = 'not-allowed';
}

function enablingButton0()
{
    document.getElementById('number0').disabled = false; document.getElementById('number0').style.color = '#000000'; document.getElementById('number0').style.cursor = 'pointer';
}

function disablingNegativeOrPositiveButton()
{
    document.getElementById('plusMinus').disabled = true; document.getElementById('plusMinus').style.color = document.getElementById('plusMinus').style.backgroundColor; document.getElementById('plusMinus').style.cursor = 'not-allowed';
}

function enablingNegativeOrPositiveButton()
{
    document.getElementById('plusMinus').disabled = false; document.getElementById('plusMinus').style.color = '#000000'; document.getElementById('plusMinus').style.cursor = 'pointer';
}

function enablingButtonsExceptOperators()
{
    allButtonsHtml.forEach(elements => {elements.disabled = false; elements.style.color = '#000000'; elements.style.cursor = 'pointer'});
}

function disablingButtonsExceptOperators()
{
    allNumberButtonsHtml.forEach(elements => {elements.disabled = true; elements.style.color = elements.style.backgroundColor; elements.style.cursor = 'not-allowed'});
    document.getElementById('number0').disabled = true; document.getElementById('number0').style.color = document.getElementById('number0').style.backgroundColor; document.getElementById('number0').style.cursor = 'not-allowed';
}

function enablingAllButtons()
{
    allButtonsHtml.forEach(elements => {elements.disabled = false; elements.style.color = '#000000'; elements.style.cursor = 'pointer'});
}

function disablingAllButtons()
{
    errorBool = true;
    allButtonsHtml.forEach(elements => {elements.disabled = true; elements.style.color = elements.style.backgroundColor; elements.style.cursor = 'not-allowed'});
    allButtonsHtml[0].disabled = false;
    allButtonsHtml[0].style.color = '#000000'; allButtonsHtml[0].style.cursor = 'pointer';
    display.textContent = 'ERROR';
}


function clickingOperationButtons(button)
{
    if(errorBool) return;
    if (document.getElementById('display').textContent != 'ERROR') 
    {
        enablingButtonsExceptOperators();
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
        if (numFalse) 
        {
            disablingNegativeOrPositiveButton();
        }
    }
}

function gettingFirstNumOperation(button)
{
    operator = button;
    let display = document.getElementById('display');
    num1 = ConvertToDecimal(display.textContent);
    numFalse = true;
}

function operationClickingEqual()
{
    unhighlightOperatorButton();
    let display = document.getElementById('display');
    num2 = ConvertToDecimal(display.textContent);
    if(numFalse) 
    {
        disablingAllButtons();
        return;
    }
    result = mathematicalOperations(operator);
    
    if(countNumbers(resultDisplay(result)) > 10) 
    {
        disablingAllButtons();
        return;
    }
    else
        display.textContent = resultDisplay(result)

    numFalse = true;
    num1 = null;
    num2 = null;
    operator = null;
    multipleOperationCheck = false;
}

function multipleOperationWithoutEqual(button)
{
    let display = document.getElementById('display');
    if (numFalse) 
    {
        operator = button;
    }
    else
    {
    num2 = ConvertToDecimal(display.textContent); 
    result = mathematicalOperations(operator);

    display.textContent = resultDisplay(result);

    numFalse = true;
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
        errorBool = true;
        disablingAllButtons();
        return 'ERROR';
    }
    if(Math.abs(result) < 0.000000001) return '0';
    if(isNaN(result) || !(result==result))
    {
        errorBool = true;
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
