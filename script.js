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

// Initialize reels
function init() {
    [reel1, reel2, reel3].forEach(reel => {
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icons';
        // Start with a random symbol wrapped in a div
        iconContainer.innerHTML = `<div>${symbols[Math.floor(Math.random() * symbols.length)]}</div>`;
        reel.innerHTML = '';
        reel.appendChild(iconContainer);
    });
}
init();

function spin() {
    if (spinButton.disabled) return;
    spinButton.disabled = true;

    // Clear previous win effects
    [reel1, reel2, reel3].forEach(el => el.classList.remove('win'));

    const reels = [reel1, reel2, reel3];
    const results = [];
    let completedReels = 0;

    reels.forEach((reel, index) => {
        const resultSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        results.push(resultSymbol);

        const delay = index * 500;
        const numIcons = 20; // Number of symbols to scroll through
        const iconHeight = 100;

        const iconContainer = reel.querySelector('.icons');
        const currentSymbol = iconContainer.querySelector('div').innerText.trim();

        let stripContent = `<div>${currentSymbol}</div>`;
        for (let i = 0; i < numIcons; i++) {
            if (i === numIcons - 1) {
                 stripContent += `<div>${resultSymbol}</div>`;
            } else {
                 stripContent += `<div>${symbols[Math.floor(Math.random() * symbols.length)]}</div>`;
            }
        }

        iconContainer.innerHTML = stripContent;
        iconContainer.style.transition = 'none';
        iconContainer.style.top = '0px';

        // Force reflow
        void iconContainer.offsetWidth;

        setTimeout(() => {
            iconContainer.style.transition = 'top 2s cubic-bezier(0.25, 1, 0.5, 1)';
            const targetTop = -(numIcons * iconHeight);
            iconContainer.style.top = `${targetTop}px`;
        }, delay + 50);

        // Cleanup after animation
        setTimeout(() => {
            iconContainer.style.transition = 'none';
            iconContainer.innerHTML = `<div>${resultSymbol}</div>`;
            iconContainer.style.top = '0px';

            completedReels++;
            if (completedReels === 3) {
                spinButton.disabled = false;
                checkWin(results);
            }
        }, delay + 2000 + 100);
    });
}

function checkWin(result) {
    const resultString = result.join('-');
    if (payouts[resultString]) {
        playerMoney += payouts[resultString];
        updateBalance();
        // Add visual feedback for winning
        [reel1, reel2, reel3].forEach(el => el.classList.add('win'));
        console.log(`Win! Payout: ${payouts[resultString]}`);
    }
}

function updateBalance() {
    balanceAmount.textContent = playerMoney;
}

// Event Listeners
spinButton.addEventListener('click', spin);
