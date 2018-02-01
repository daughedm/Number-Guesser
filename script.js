var randomNumber = Math.floor(Math.random() * 100) + 1;
var previousGuess = document.querySelector('#previous-guess');
var lastResult = document.querySelector('#last-result');
var highLow = document.querySelector('#high-low');
var guessSubmit = document.querySelector('#guess-submit');
var guessField = document.querySelector('#guess-field');
var clearButton = document.querySelector('#clear-textfield');
var guessCount = 1;
var resetButton = document.querySelector('#reset');
var numberOfGuesses = document.querySelector('#number-of-guesses');

guessSubmit.addEventListener('click', checkGuess);
clearButton.addEventListener('click', clearField);
resetButton.addEventListener('click', resetGame);
guessField.addEventListener("keyup", enableDisableClearBtn);
guessField.addEventListener("keyup", enableDisableGuessBtn);
guessField.addEventListener("keyup", minMaxValidation);
resetButton.addEventListener('click', resetGame);

function checkGuess() {
  var userGuess = parseInt(guessField.value);
  guessField.value = '';

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
    gameOverSizeAdd();
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
  
  numberOfGuesses.textContent = 10 - guessCount + ' Guesses Left';
  guessCount++;
  enableDisableGuessBtn();
  enableDisableClearBtn();
  enableDisableResetBtn();
  resetButton.disable = false;
}

function clearField() {
  guessField.value = '';
  enableDisableClearBtn();
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.querySelector('#reset');
}

function resetGame() {
  guessCount = 0;
  numberOfGuesses.textContent = 10 - guessCount + ' Guesses Left';
  var resetParas = document.querySelectorAll('.paras');
  resetParas[0].textContent = 'Pick a number 1 - 100';
  resetParas[1].textContent = '?';
  resetParas[2].textContent = '';
  gameOverSizeRemove();
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
  if (guessField.value) {
    clearButton.disabled = false;
    
  } else {
    clearButton.disabled = true;
  }
}

function enableDisableGuessBtn() {
  if (guessField.value) {
    guessSubmit.disabled = false;
  } else {
    guessSubmit.disabled = true;
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
  var resetParas = document.querySelectorAll('.paras');
  if (guessField.value > 100 || guessField.value < 0) {
    resetParas[0].textContent = 'THAT IS NOT 0 - 100!';
    guessField.value = '';
  }
}

function gameOverSizeRemove () {
  lastResult.classList.remove('game-over');
}

function gameOverSizeAdd () {
  lastResult.classList.add('game-over');
}