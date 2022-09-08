import {setAllButtonsStatus,setButtonStatus,setStatusFromZeroToNine,highlightOperatorButton, unhighlightOperatorButtons} from "./StatusHelper.js";
import {ConvertToDecimal,mathematicalOperations, countDigits} from "./MathHelper.js";

const display = document.getElementById('display');
const ALL_NUMBER_BUTTONS = document.querySelectorAll('.numbers');
const ALL_OPERATOR_BUTTONS = document.querySelectorAll('.operatorButton');

let num1;
let num2;
let operator;
let isMultipleOperationCheck = false;
let result;
let isNumShowedOnDisplay = false;
let isErrorInDisplay = false;

window.onload = function() 
{
    calculatorReset();

    for (let index = 0; index < ALL_NUMBER_BUTTONS.length; index++) 
    {
        if (ALL_NUMBER_BUTTONS[index].id == "comma")
            ALL_NUMBER_BUTTONS[index].onclick = function(){clickingNumericalButton(",")};
        else
        ALL_NUMBER_BUTTONS[index].onclick = function(){clickingNumericalButton(ALL_NUMBER_BUTTONS[index].id)};
    }

    for (let index = 0; index < ALL_OPERATOR_BUTTONS.length; index++) 
    {
        ALL_OPERATOR_BUTTONS[index].onclick = function(){clickingOperatorButton(ALL_OPERATOR_BUTTONS[index].id);highlightOperatorButton(ALL_OPERATOR_BUTTONS[index].id);};
    }

    document.getElementById("eraseButton").onclick = function(){calculatorReset()};
    document.getElementById("+-").onclick = function(){clickingNegativeButton()};
    document.getElementById("number0").onclick = function(){clickingNumericalButton("0")};
    document.getElementById("equal").onclick = function(){clickingOperatorButton("="); unhighlightOperatorButtons();};
};

document.addEventListener("keydown", (event) => 
{
    event.preventDefault();
    var keyValue = event.key;

    if (keyValue == "Escape") calculatorReset()
    else 
    {        
        if (keyValue == "*" || keyValue == "/" || keyValue == "+" || keyValue == "-") 
        {
            clickingOperatorButton(keyValue);            
        }
        else if (keyValue == "Enter" && operator != null)
            {
                operationClickingEqual();
            }  
            else if (keyValue == 'Enter' && operator == null) 
            {
                if (display.textContent[display.textContent.length-1] == ',') 
                    display.textContent = display.textContent.substring(0, display.textContent.length-1)
            }
        if (keyValue == "Control") clickingNegativeButton();
        if ((keyValue >= 0 && keyValue <= 9) || keyValue==",") clickingNumericalButton(keyValue);
    }
});


function clickingNumericalButton(digitClicked) 
{
    if(isErrorInDisplay) return;

    let isCommaInDisplay = display.innerHTML.includes(',');
    if(digitClicked == ',' && !isNumShowedOnDisplay)
        setButtonStatus('comma', false);
    if(isNumShowedOnDisplay || display.innerHTML == '0')
        {   
            if (digitClicked == ',')
                {
                    display.innerHTML = '0,';
                    setButtonStatus('+-', false); 
                }
            else 
                display.innerHTML = digitClicked;
        }
    else if (countDigits(display.innerHTML) >= 10) 
        return; 
    else if (isCommaInDisplay && digitClicked == ',') 
        return;
    else if (display != '' && operator != null && isMultipleOperationCheck)
        display.innerHTML = digitClicked;
    else 
    {
        display.innerHTML += digitClicked;
        if (countDigits(display.innerHTML) >= 10) 
            setStatusFromZeroToNine(false);
    }

    isMultipleOperationCheck = false;
    isNumShowedOnDisplay = false;
    if (display.innerHTML != '0,') 
        setButtonStatus('+-', true);   
 
    if (countDigits(display.innerHTML) < 10) 
        setButtonStatus('number0', true);    
}

function calculatorReset()
{
    setAllButtonsStatus(true);
    setButtonStatus('number0', false);
    setButtonStatus('+-', false);
    unhighlightOperatorButtons();
    document.getElementById('display').innerHTML = '0';
    num1 = null;
    num2 = null;
    operator = null;
    result =  null;
    isMultipleOperationCheck = false;
    isErrorInDisplay = false;
}

function clickingNegativeButton()
{
    if (display.textContent[0] == '-') 
    {
        display.textContent = display.textContent.substring(1, display.textContent.length)
    }
    else if (display.textContent !== '0,' && display.textContent !== '0')
        display.textContent = '-' + display.textContent;

}

function clickingOperatorButton(buttonId)
{
    if(!isErrorInDisplay) 
    {
        setStatusFromZeroToNine(true);
        if(operator == null && buttonId != '=') gettingFirstNumOperation(buttonId); 
        else if (buttonId == '=' ) 
        {
            if(isNumShowedOnDisplay && operator != null) display.textContent = 'ERROR';
            else if (operator == null) 
            {
                if (display.textContent[display.textContent.length-1] == ',') 
                display.textContent = display.textContent.substring(0, display.textContent.length-1)
            } 
            else
                operationClickingEqual();
        }
        else if (operator != null && result == null) multipleOperationWithoutEqual(buttonId);
        if (isNumShowedOnDisplay) setButtonStatus('+-', false);
        if (buttonId != "=") 
            highlightOperatorButton(buttonId);
    }    
}

function gettingFirstNumOperation(button)
{
    operator = button;
    num1 = ConvertToDecimal(display.textContent);
    isNumShowedOnDisplay = true;
}

function operationClickingEqual()
{
    unhighlightOperatorButtons();
    num2 = ConvertToDecimal(display.textContent);
    if(isNumShowedOnDisplay) 
    {
        setAllButtonsStatus(true);
        return;
    }
    result = mathematicalOperations(operator, num1, num2);
    
    if(countDigits(resultDisplay(result)) > 10) 
    {
        setAllButtonsStatus(true);
        return;
    }
    else
        display.textContent = resultDisplay(result)

    isNumShowedOnDisplay = true;
    num1 = result;
    num2 = null;
    result = null;
    operator = null;
}

function multipleOperationWithoutEqual(button)
{
    isMultipleOperationCheck = true; 
    if (isNumShowedOnDisplay) 
        operator = button;
    else
    {
        num2 = ConvertToDecimal(display.textContent); 
        result = mathematicalOperations(operator, num1, num2);

        display.textContent = resultDisplay(result);

        isNumShowedOnDisplay = true;
        num1 = result;
        num2 = null;
        operator = button;
        result = null;
 
    }
}

function resultDisplay(result)
{
    if(Math.abs(result) > 9999999999) 
    {
        isErrorInDisplay = true;
        setAllButtonsStatus(false);
        return 'ERROR';
    }
    if(Math.abs(result) < 0.000000001) return '0';
    if(isNaN(result) || !(result==result))
    {
        isErrorInDisplay = true;
        setAllButtonsStatus(false);
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
