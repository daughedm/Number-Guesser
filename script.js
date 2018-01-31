var randomNumber = Math.floor(Math.random() * 100) + 1;
var previousGuess = document.querySelector('#previous-guess');
var lastResult = document.querySelector('#last-result');
var highLow = document.querySelector('#high-low');
var guessSubmit = document.querySelector('#guess-submit');
var guessField = document.querySelector('#guess-field');
var clearButton = document.querySelector('#clear-textfield');
var guessCount = 1;
var resetButton = document.querySelector('#reset');


function checkGuess() {

  var userGuess = Number(guessField.value);

  enableDisableClearBtn();
  enableDisableGuessBtn();
  enableDisableResetBtn();

  if (guessCount === 1) {
    previousGuess.textContent = 'Your last guess was';
    resetButton.disabled = false;
  }

  if (userGuess === randomNumber) {
    lastResult.textContent = 'BOOM!';
    highLow.textContent = 'You are right!';
    setGameOver();
  } else if (guessCount === 10) {
    previousGuess.textContent = '';
    lastResult.textContent = 'GAME OVER';
    highLow.textContent = 'You are out of guesses';
    setGameOver();
  } else {
    lastResult.textContent = userGuess;
    if (userGuess < randomNumber) {
      highLow.textContent = 'That is too low!';
    } else if (userGuess > randomNumber) {
      highLow.textContent = 'That is too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  resetButton.disable = false;
}

function clearField() {
  guessField.value = '';
}

guessSubmit.addEventListener('click', checkGuess);
clearButton.addEventListener('click', clearField);
resetButton.addEventListener('click', resetGame);
guessField.addEventListener("keyup", enableDisableClearBtn);
guessField.addEventListener("keyup", enableDisableGuessBtn);
guessField.addEventListener("blur", minMaxValidation);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.querySelector('#reset');
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 0;
  var resetParas = document.querySelectorAll('.paras');
  resetParas[0].textContent = 'Pick a number 1 - 100';
  resetParas[1].textContent = '?';
  resetParas[2].textContent = '';
  resetButton.disabled = true;
  guessField.disabled = false;
  guessSubmit.disabled = true;
  clearButton.disabled = true;
  guessField.value = '';
  guessField.focus();
  randomNumber = Math.floor(Math.random() * 100) + 1;
  enableDisableResetBtn()
}

function enableDisableClearBtn() {
  if (guessField.value.length < 0) {
    clearButton.disabled = true;
  } else {
    clearButton.disabled = false;
  }
}

function enableDisableGuessBtn() {
  if (guessField.value.length < 0) {
    guessSubmit.disabled = true;
  } else {
    guessSubmit.disabled = false;
  }
}

function enableDisableResetBtn() {
  if (guessCount < 1) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}

function minMaxValidation() {
  if (guessField.value > 100 || guessField.value < 0) {
    alert('That is not beween 0 - 100');
    guessField.value = ''
  }
}