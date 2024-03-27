const playerOptions = document.querySelectorAll('.throw-option');
const computerThrowImage = document.getElementById('computer-throw-image');
const outcomeMessage = document.getElementById('outcome-message');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const tiesDisplay = document.getElementById('ties');
const resetButton = document.getElementById('reset-button');

const throws = ['rock', 'paper', 'scissors'];
const computerThrowImages = {
    'rock': 'img/rock.PNG',
    'paper': 'img/paper.PNG',
    'scissors': 'img/scissors.PNG',
    'question': 'img/question-mark.PNG'
};

let wins = 0;
let losses = 0;
let ties = 0;

playerOptions.forEach(option => {
    option.addEventListener('click', () => {
        playerOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        const playerThrow = option.alt.toLowerCase();
        computerDecideThrow(playerThrow);
    });
});

function computerDecideThrow(playerThrow) {
    let counter = 0;
    const interval = setInterval(() => {
        const randomThrow = throws[Math.floor(Math.random() * throws.length)];
        computerThrowImage.src = computerThrowImages[randomThrow];
        counter++;
        if (counter >= 6) {
            clearInterval(interval);
            const computerThrow = throws[Math.floor(Math.random() * throws.length)];
            computerThrowImage.src = computerThrowImages[computerThrow];
            determineWinner(playerThrow, computerThrow);
        }
    }, 500);
}

function determineWinner(playerThrow, computerThrow) {
    if (playerThrow === computerThrow) {
        outcomeMessage.textContent = 'It\'s a tie!';
        ties++;
        tiesDisplay.textContent = ties;
    } else if (
        (playerThrow === 'rock' && computerThrow === 'scissors') ||
        (playerThrow === 'paper' && computerThrow === 'rock') ||
        (playerThrow === 'scissors' && computerThrow === 'paper')
    ) {
        outcomeMessage.textContent = 'You win!';
        wins++;
        winsDisplay.textContent = wins;
    } else {
        outcomeMessage.textContent = 'Computer wins!';
        losses++;
        lossesDisplay.textContent = losses;
    }
}

resetButton.addEventListener('click', () => {
    wins = 0;
    losses = 0;
    ties = 0;
    winsDisplay.textContent = wins;
    lossesDisplay.textContent = losses;
    tiesDisplay.textContent = ties;
    outcomeMessage.textContent = '';
    computerThrowImage.src = computerThrowImages['question'];
    playerOptions.forEach(opt => opt.classList.remove('selected'));
});
