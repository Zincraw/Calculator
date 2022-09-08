const ALL_BUTTONS_CALCULATOR = document.querySelectorAll('button');
const ALL_NUMBER_BUTTONS = document.querySelectorAll('.numbers');
const ALL_OPERATOR_BUTTONS = document.querySelectorAll('.operatorButton');
const OPERATOR_BUTTON_BACKGROUND_COLOR = '#eff8bc';
const OPERATOR_BUTTON_BACKGROUND_COLOR_HIGHLIGHTED = '#c9ed00';


export function setButtonStatus(buttonId, status)
{
    let button = document.getElementById(buttonId);
    let buttonColor;
    if (button.classList.contains('operatorButton')) buttonColor = "#9fa580";
    else if (button.classList.contains('specialButton')) buttonColor = "#9fa580";
    else buttonColor = "#61728b";

    document.getElementById(buttonId).disabled = !status;
    if (status) 
    {        
        document.getElementById(buttonId).style.color = '#000000'; 
        document.getElementById(buttonId).style.cursor = 'pointer';
    }
    else 
    {        
        document.getElementById(buttonId).style.color = buttonColor; 
        document.getElementById(buttonId).style.cursor = 'not-allowed';
    }
}

export function setAllButtonsStatus(status)
{
    ALL_BUTTONS_CALCULATOR.forEach(button => setButtonStatus(button.id, status));
    if (!status) 
    {
        setButtonStatus('eraseButton', true);
        document.getElementById('display').textContent = 'ERROR';
    }
    else 
        setButtonStatus('eraseButton', true);
    
}

export function setStatusFromZeroToNine(status)
{
        ALL_NUMBER_BUTTONS.forEach(button => setButtonStatus(button.id, status));
        setButtonStatus('number0', status);
}

export function highlightOperatorButton(buttonId)
{
    unhighlightOperatorButtons();
    document.getElementById(buttonId).style.backgroundColor = OPERATOR_BUTTON_BACKGROUND_COLOR_HIGHLIGHTED;     
}

export function unhighlightOperatorButtons()
{
    ALL_OPERATOR_BUTTONS.forEach(operator => {operator.style.backgroundColor = OPERATOR_BUTTON_BACKGROUND_COLOR});
}