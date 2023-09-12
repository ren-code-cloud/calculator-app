const buttonElements = document.querySelectorAll('[data-num]');
const operationButtons = document.querySelectorAll('[data-operation]');
const currentVal = document.getElementById('current');
const previousVal = document.getElementById('previous');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const equalButtons = document.querySelector('.equal')

let currentValueElements = '';
let previousValueWlements = '';
let operation = undefined;
let equalButton_ = false;

buttonElements.forEach((button) => {
  button.addEventListener('click', () => {
    if (equalButton_ === true) {
      currentValueElements = '';
      equalButton_ = false;
      appendNumber(button.textContent); 
    }else{
      appendNumber(button.textContent); 
    }
    display();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    operations(button.textContent)
    display()
  })
})

clearButton.addEventListener('click', () => {
  clear()
  display()
});

deleteButton.addEventListener("click", () => {
  deleteNum();
})

equalButtons.addEventListener('click', () => {
  if (operation && currentValueElements) {
    const expression = `${previousValueWlements}${currentValueElements}`;
    const result = compute(expression);
    currentValueElements = result.toString();
    previousValueWlements = '';
    operation = undefined;
    display();
    equalButton_ = true;
  }
});

function appendNumber(num) {

  if(num === '.' && currentValueElements.includes('.')) return
  currentValueElements += num.toString();
}

function display() {
  currentVal.innerText = currentValueElements;
  console.log(currentValueElements);
  console.log(previousValueWlements);
  operation !== undefined
  ? previousVal.innerText = `${previousValueWlements}`
  : previousVal.innerText = ''
  
}
function clear() {
  currentValueElements = '';
  previousValueWlements = '';
  operation = undefined;
}
function operations (oper) {
  if(currentValueElements === '') return
  operation = oper;
  previousValueWlements += `${currentValueElements} ${oper} `
  currentValueElements = ''
}

function deleteNum() {
  currentValueElements = currentVal.textContent.slice(0, -1);
  currentVal.innerText = currentValueElements;
}

function compute(expression) {
  const operators = [];
  const operands = [];

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  function applyOperator() {
    const operator = operators.pop();
    const rightOperand = operands.pop();
    const leftOperand = operands.pop();

    let result;
    switch (operator) {
      case '+':
        result = leftOperand + rightOperand;
        break;
      case '-':
        result = leftOperand - rightOperand;
        break;
      case 'x':
        result = leftOperand * rightOperand;
        break;
      case '÷':
        result = leftOperand / rightOperand;
        break;
      case '%':
        result = leftOperand % rightOperand;
    }

    operands.push(result);
  }

  let i = 0;
  while (i < expression.length) {
    if (expression[i] === ' ') {
      i++;
      continue;
    }

    if (expression[i] >= '0' && expression[i] <= '9') {
      let num = 0;
      while (i < expression.length && expression[i] >= '0' && expression[i] <= '9') {
        num = num * 10 + (expression[i] - '0');
        i++;
      }
      operands.push(num);
    } else {
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[expression[i]]
      ) {
        applyOperator();
      }
      operators.push(expression[i]);
      i++;
    }
  }

  while (operators.length > 0) {
    applyOperator();
  }

  return operands[0];
}