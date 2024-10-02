document.addEventListener("DOMContentLoaded", function() {
  const givenNumbersEl = document.getElementById('givenNumbers');
  const targetNumberEl = document.getElementById('targetNumber');
  const generateButton = document.getElementById('generate');
  const submitButton = document.getElementById('submit');
  const userInputEl = document.getElementById('userInput');
  let largeNumbersCount = 0; // New variable to replace largeNumbersEl

  // New Event Listener Block
const largeNumberButtons = document.querySelectorAll('.largeNumberButton');

largeNumberButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    // Remove 'selected' class from all buttons
    largeNumberButtons.forEach(btn => {
      btn.classList.remove('selected');
    });

    // Add 'selected' class to clicked button
    e.target.classList.add('selected');

    // Update the number of large numbers
    largeNumbersCount = parseInt(e.target.getAttribute('data-value'));
  });
});


  let givenNumbers = [];
  let targetNumber = 0;

  generateButton.addEventListener('click', function() {
    givenNumbers = generateGivenNumbers(largeNumbersCount); // Using the new variable here
    targetNumber = generateTargetNumber();

    givenNumbersEl.innerHTML = 'Given Numbers: ' + givenNumbers.join(', ');
    targetNumberEl.innerHTML = 'Target Number: ' + targetNumber;
  });

  submitButton.addEventListener('click', function() {
    const userInput = userInputEl.value;
    if (isValidEquation(userInput, givenNumbers, targetNumber)) {
      resultEl.innerHTML = 'Correct!';
    } else {
      resultEl.innerHTML = 'Incorrect. Try Again.';
    }
  });
});

// Rest of your functions remain the same




document.addEventListener("DOMContentLoaded", function() {
  const givenNumbersEl = document.getElementById('givenNumbers');
  const targetNumberEl = document.getElementById('targetNumber');
  const generateButton = document.getElementById('generate');
  const submitButton = document.getElementById('submit');
  const userInputEl = document.getElementById('userInput');
  const resultEl = document.getElementById('result');
  const largeNumbersEl = document.getElementById('largeNumbers');

  let givenNumbers = [];
  let targetNumber = 0;

  generateButton.addEventListener('click', function() {
    const largeNumbersCount = parseInt(largeNumbersEl.value);
    givenNumbers = generateGivenNumbers(largeNumbersCount);
    targetNumber = generateTargetNumber();

    givenNumbersEl.innerHTML = 'Given Numbers: ' + givenNumbers.join(', ');
    targetNumberEl.innerHTML = 'Target Number: ' + targetNumber;
  });

  submitButton.addEventListener('click', function() {
    const userInput = userInputEl.value;
    if (isValidEquation(userInput, givenNumbers, targetNumber)) {
      resultEl.innerHTML = 'Correct!';
    } else {
      resultEl.innerHTML = 'Incorrect. Try Again.';
    }
  });
});

function generateGivenNumbers(largeNumbersCount) {
  const smallNumbers = Array.from({length: 10}, (_, i) => i + 1);
  const largeNumbers = [25, 50, 75, 100];
  const selectedLargeNumbers = [];
  const selectedSmallNumbers = [];

  for (let i = 0; i < largeNumbersCount; i++) {
    const index = Math.floor(Math.random() * largeNumbers.length);
    selectedLargeNumbers.push(largeNumbers.splice(index, 1)[0]);
  }

  for (let i = 0; i < 6 - largeNumbersCount; i++) {
    const index = Math.floor(Math.random() * smallNumbers.length);
    selectedSmallNumbers.push(smallNumbers.splice(index, 1)[0]);
  }

  return selectedLargeNumbers.concat(selectedSmallNumbers);
}

function generateTargetNumber() {
  return Math.floor(Math.random() * 899) + 100;
}

function isValidEquation(equation, numbers, target) {
  // This is a placeholder. Actual validation logic would go here.
  return false;
}
