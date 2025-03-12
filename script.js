
let hydrogenPosition = 0; // Position of the hydrogen piece
let fossilPosition = 0; // Position of the fossil fuel piece
let isHydrogenTurn = true; // Whose turn it is (true for hydrogen)

const totalSquares = 20; // Total number of squares on the track

// Initialize race tracks
function createTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track");
  const fossilTrack = document.getElementById("fossil-track");

  // Create 20 squares for each track
  for (let i = 0; i < totalSquares; i++) {
    const hydrogenSquare = document.createElement("div");
    hydrogenSquare.textContent = ""; // Leave content empty initially
    hydrogenTrack.appendChild(hydrogenSquare);

    const fossilSquare = document.createElement("div");
    fossilSquare.textContent = ""; // Leave content empty initially
    fossilTrack.appendChild(fossilSquare);
  }

  updateTracks(); // Render the initial track layout
}

// Update the race tracks
function updateTracks() {
  const hydrogenTrack = document.getElementById("hydrogen-track").children;
  const fossilTrack = document.getElementById("fossil-track").children;

  // Clear both tracks to remove any previous positions
  Array.from(hydrogenTrack).forEach((square) => {
    square.textContent = "";
    square.classList.remove("occupied"); // Remove previous occupied class
  });
  Array.from(fossilTrack).forEach((square) => {
    square.textContent = "";
    square.classList.remove("occupied"); // Remove previous occupied class
  });

  // Place the hydrogen piece at its current position
  if (hydrogenPosition < totalSquares) {
    hydrogenTrack[hydrogenPosition].textContent = "🚗";
    hydrogenTrack[hydrogenPosition].classList.add("occupied");
  }

  // Place the fossil fuel piece at its current position
  if (fossilPosition < totalSquares) {
    fossilTrack[fossilPosition].textContent = "🛢️";
    fossilTrack[fossilPosition].classList.add("occupied");
  }
}

// Roll the dice, apply scenarios, and move the current player's piece
function rollDice() {
  const diceAnimation = document.getElementById("dice-animation");
  diceAnimation.textContent = "🎲"; // Temporary dice display
  diceAnimation.style.animation = "roll 1s linear"; // Apply animation

  setTimeout(() => {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Roll a number between 1 and 6
    const currentPlayer = isHydrogenTurn ? "hydrogen" : "fossil";

    // Apply a random scenario for the current player
    const scenario = getScenario(currentPlayer);
    const scenarioEffect = scenario.effect;

    // Update the position of the current player's piece
    if (isHydrogenTurn) {
      hydrogenPosition = Math.min(hydrogenPosition + diceRoll + scenarioEffect, totalSquares - 1); // Prevent moving beyond the track
    } else {
      fossilPosition = Math.min(fossilPosition + diceRoll + scenarioEffect, totalSquares - 1); // Prevent moving beyond the track
    }

    // Update the scenario text
    const scenarioElement = document.getElementById("scenario");
    scenarioElement.textContent = `${currentPlayer === "hydrogen" ? "Hydrogen" : "Fossil Fuels"} rolled a ${diceRoll}. ${scenario.text}`;

    // Update the dice display
    diceAnimation.textContent = diceRoll;

    // Update the track layout to reflect new positions
    updateTracks();

    // Check if there's a winner
    checkWinner();

    // Switch to the next player's turn
    isHydrogenTurn = !isHydrogenTurn;
    updateTurnIndicator();
  }, 1000); // Delay for dice roll animation
}

// Generate a random scenario for the current player
function getScenario(player) {
  const scenarios = {
    hydrogen: [
      { text: "Breakthrough in hydrogen storage! Move 2 steps forward.", effect: 2 },
      { text: "Public adoption of hydrogen slows. Move 1 step back.", effect: -1 },
      { text: "Hydrogen vehicles gain popularity! Move 3 steps forward.", effect: 3 },
      { text: "Storage system leak. Move 2 steps back.", effect: -2 }
    ],
    fossil: [
      { text: "Oil prices skyrocket! Move 1 step forward.", effect: 1 },
      { text: "Environmental protests. Move 2 steps back.", effect: -2 },
      { text: "Increased demand for fossil fuels. Move 2 steps forward.", effect: 2 },
      { text: "Oil spill disaster. Move 3 steps back.", effect: -3 }
    ]
  };

  // Pick a random scenario for the player
  const options = scenarios[player];
  return options[Math.floor(Math.random() * options.length)];
}

// Update the turn indicator
function updateTurnIndicator() {
  const turnIndicator = document.getElementById("turn-indicator");
  turnIndicator.textContent = isHydrogenTurn ? "Hydrogen's Turn" : "Fossil's Turn";
}

// Check if there is a winner
function checkWinner() {
  if (hydrogenPosition === totalSquares - 1) {
    displayWinner("Hydrogen Wins! Clean energy prevails!");
  } else if (fossilPosition === totalSquares - 1) {
    displayWinner("Fossil Fuels Win! But at what cost?");
  }
}

// Display the winner banner and disable actions
function displayWinner(message) {
  const winnerBanner = document.getElementById("winner-banner");
  const actionsArea = document.getElementById("actions");
  const restartArea = document.getElementById("restart-area");

  winnerBanner.textContent = message; // Show the winning message
  winnerBanner.style.display = "block"; // Make the banner visible
  actionsArea.style.display = "none"; // Hide game controls
  restartArea.style.display = "block"; // Show restart button
}

// Restart the game
function restartGame() {
  hydrogenPosition = 0; // Reset hydrogen piece position
  fossilPosition = 0; // Reset fossil fuel piece position
  isHydrogenTurn = true; // Reset to hydrogen's turn

  const winnerBanner = document.getElementById("winner-banner");
  const actionsArea = document.getElementById("actions");
  const restartArea = document.getElementById("restart-area");

  winnerBanner.style.display = "none"; // Hide winner announcement
  actionsArea.style.display = "block"; // Show game controls
  restartArea.style.display = "none"; // Hide restart button

  updateTracks(); // Reset tracks
  updateTurnIndicator(); // Reset turn indicator
}

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", createTracks);
