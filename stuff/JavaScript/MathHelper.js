export function mathematicalOperations(operator, num1, num2)
{
    console.log(num1 + ' ' + operator + ' ' + num2 + ' =');
    switch (operator) 
        {
            case '/':
                return num1 / num2;
            case '*':
                return num1 * num2;
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            default:
                setAllButtonsStatus(true);
                return 'ERROR';
        }
}

export function ConvertToDecimal(comma) { return parseFloat(comma.replace(',','.')); }

export function countDigits(num) { return num.replace(/[^0-9]/g, '').length; }