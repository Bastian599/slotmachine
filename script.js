// Game State
let playerMoney = 0;

const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐', '❼'];

const payouts = {
    '❼-❼-❼': 100,
    '⭐-⭐-⭐': 50,
    '🔔-🔔-🔔': 25,
    '🍊-🍊-🍊': 10,
    '🍋-🍋-🍋': 5,
    '🍒-🍒-🍒': 2,
};

// UI Elements
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const balanceAmount = document.getElementById('balance-amount');
const spinButton = document.getElementById('spin-button');
const messageDisplay = document.getElementById('message');

function spin() {
    // Clear previous message
    messageDisplay.textContent = '';
    messageDisplay.classList.remove('win-animation');

    // Generate random symbols for each reel
    const result1 = symbols[Math.floor(Math.random() * symbols.length)];
    const result2 = symbols[Math.floor(Math.random() * symbols.length)];
    const result3 = symbols[Math.floor(Math.random() * symbols.length)];

    // Update the UI to show the new symbols
    reel1.textContent = result1;
    reel2.textContent = result2;
    reel3.textContent = result3;

    // Check for wins
    checkWin([result1, result2, result3]);
}

function checkWin(result) {
    const resultString = result.join('-');
    if (payouts[resultString]) {
        playerMoney += payouts[resultString];
        updateBalance();
        // Add visual feedback for winning
        messageDisplay.textContent = `Win! Payout: ${payouts[resultString]}`;
        messageDisplay.classList.add('win-animation');
        console.log(`Win! Payout: ${payouts[resultString]}`);
    }
}

function updateBalance() {
    balanceAmount.textContent = playerMoney;
}

// Event Listeners
spinButton.addEventListener('click', spin);
