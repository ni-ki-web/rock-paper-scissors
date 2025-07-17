// Game state variables
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
const roundLimit = 5;

// DOM elements
const buttons = document.querySelectorAll(".choices button");
const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const selectionDiv = document.getElementById("selections");
const restartBtn = document.getElementById("restartBtn");

// Handle user chocie and play round
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const humanChoice = button.dataset.type;
    const computerChoice = getComputerChoice();
    showSelection(humanChoice, computerChoice);
    playRound(humanChoice, computerChoice);
  });
});

// Restart game: reset scores, round, UI, and re-enable buttons
restartBtn.addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  currentRound = 0;
  resultDiv.textContent = "";
  resultDiv.className = "";
  scoreDiv.textContent = "You: 0 | Computer: 0";
  selectionDiv.textContent = "You: - | Computer: -";
  document.getElementById("round").textContent = "Round 1 of 5";
  resultDiv.textContent = "Make your move!";
  resultDiv.className = "result neutral";
  buttons.forEach(button => button.disabled = false);
  restartBtn.textContent = "Restart Game";
});

/**
 * Get a random computer choice
 * @returns {string} - Either "rock", "paper" or "scissors" 
*/ 
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

/**
 * Play a round of Rock Paper Scissors.
 * Compares human and computer choices, updates scores and displays the result.
 * @param {string} human - human's choice ("rock", "paper", "scissors")
 * @param {string} computer - Computer's randomly selected choice
*/ 
function playRound(human, computer) {
  const outcome = determineOutcome(human, computer);
  updateRoundResult(outcome);
  updateScore(outcome);
  updateRoundDisplay();

  if (isGameOver()) {
    handleGameOver();
  }
}

// ====== Game Logic ======
function determineOutcome(human, computer) {
  if (human === computer) {
    return "tie";
  } else {
    const win = 
        (human === "rock" && computer === "scissors") ||
        (human === "paper" && computer === "rock") ||
        (human === "scissors" && computer === "paper");
    return win ? "win" : "lose";
  }
}

// ====== UI Update Functions ======
function updateRoundResult(outcome) {
  resultDiv.className = `result ${outcome}`;

  // Display round outcome
  if (outcome === "tie") {
    resultDiv.textContent = "It's a tie!";
  } else if (outcome === "win") {
    resultDiv.textContent = "You win this round!";
  } else {
    resultDiv.textContent = "You lose this round.";
  }
}

function updateScore(outcome) {
  if (outcome === "win") humanScore++;
  if (outcome === "lose") computerScore++;

  scoreDiv.innerHTML = ` You: <span class="human-score"> ${humanScore}</span> |
    Computer: <span class="computer-score"> ${computerScore}</span>`;
}

function updateRoundDisplay() {
  currentRound++;
  document.getElementById("round").textContent = `Round ${currentRound} of ${roundLimit}`;
}

function isGameOver() {
  // Game ends if someone's score reaches 3 or max rounds are played
  const gameOver = humanScore === 3 || computerScore === 3 || currentRound === roundLimit;
  if (gameOver) {
    restartBtn.textContent = "Play Again";
  }
  return gameOver;
}

function handleGameOver() {
  let winnerMessage = "";

  if (humanScore > computerScore) {
    resultDiv.className = "result win";
    winnerMessage = "Congratulations! You won the game!"
  } else if (humanScore < computerScore) {
    resultDiv.className = "result lose";
    winnerMessage = "OOPS! You lost the game";
  } else {
    resultDiv.className = "result tie";
    winnerMessage = "The game was a draw";
  }

  resultDiv.textContent = winnerMessage;
  disableButtons();
}

// Show the choices selected by human and computer
function showSelection(human, computer) {
  const icons = {
    rock: "fa-solid fa-hand-back-fist fa-3x rock-icon",
    paper: "fa-solid fa-hand-paper fa-3x paper-icon",
    scissors: "fa-solid fa-hand-scissors fa-3x scissors-icon"
  };

  selectionDiv.innerHTML = `You: <i class="${icons[human]}"></i> |
    Computer: <i class="${icons[computer]}"></i>`;
}

// Disable all button choices
function disableButtons() {
  console.log("Disabling buttons...");
  buttons.forEach(button => {
    button.disabled = true;
    console.log(button, button.disabled); // Check if `true`
  });  
}