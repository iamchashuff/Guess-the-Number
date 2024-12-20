let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function checkGuess() {
  const feedbackElement = document.getElementById("feedback");
  let inputElement = document.getElementById("guess");
  let guess = parseInt(inputElement.value);

  // Clear previous shake and bounce animations
  inputElement.classList.remove("shake");
  feedbackElement.classList.remove("bounce");

  if (!guess || guess < 1 || guess > 100) {
    feedbackElement.innerHTML = "Please enter a valid number between 1 and 100.";
    feedbackElement.style.color = "orange";
    return;
  }

  attempts--;

  if (guess === randomNumber) {
    feedbackElement.innerHTML = "Congratulations! You guessed it right.";
    feedbackElement.style.color = "lime";
    feedbackElement.classList.add("bounce");
    updateBestScore();
    attempts = 0;
  } else {
    feedbackElement.innerHTML = guess < randomNumber ? 
      `Too low! Try again. ${attempts} attempts remaining.` : 
      `Too high! Try again. ${attempts} attempts remaining.`;
    feedbackElement.style.color = "orange";
    inputElement.classList.add("shake");

    // Remove shake class after animation ends
    setTimeout(() => {
      inputElement.classList.remove("shake");
    }, 500); // Match the duration of shake animation
  }

  if (attempts === 0 && guess !== randomNumber) {
    feedbackElement.innerHTML = "No more attempts! Game over!";
    feedbackElement.style.color = "orange";
  }
}

function updateBestScore() {
  const bestScore = localStorage.getItem("bestScore");
  if (!bestScore || attempts > bestScore) {
    localStorage.setItem("bestScore", attempts);
  }
  displayBestScore();
}

function displayBestScore() {
  const bestScore = localStorage.getItem("bestScore");
  document.getElementById("best-score").innerText = bestScore ? `Best Score: ${bestScore}` : "Best Score: N/A";
}

function reset() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 10;
  const inputElement = document.getElementById("guess");
  inputElement.value = '';
  inputElement.classList.remove("shake");
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.innerHTML = '';
  feedbackElement.style.color = 'white';
  displayBestScore();
}

window.onload = displayBestScore;
