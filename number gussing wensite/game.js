class NumberGuessingGame {
    constructor() {
        this.targetNumber = this.generateRandomNumber();
        this.attempts = 10;
        this.guessHistory = [];
        
        this.guessInput = document.getElementById('guessInput');
        this.submitButton = document.getElementById('submitGuess');
        this.newGameButton = document.getElementById('newGame');
        this.attemptsDisplay = document.getElementById('attempts');
        this.messageDisplay = document.getElementById('message');
        this.historyDisplay = document.getElementById('history');
        
        this.setupEventListeners();
        this.updateDisplay();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    setupEventListeners() {
        this.submitButton.addEventListener('click', () => this.checkGuess());
        this.newGameButton.addEventListener('click', () => this.startNewGame());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkGuess();
        });
    }

    checkGuess() {
        const guess = parseInt(this.guessInput.value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.showMessage('Please enter a valid number between 1 and 100', 'error');
            return;
        }

        this.attempts--;
        this.guessHistory.push(guess);
        
        if (guess === this.targetNumber) {
            this.showMessage(`Congratulations! You guessed the number ${this.targetNumber} correctly!`, 'success');
            this.endGame();
        } else if (this.attempts === 0) {
            this.showMessage(`Game Over! The number was ${this.targetNumber}`, 'error');
            this.endGame();
        } else {
            const hint = guess < this.targetNumber ? 'higher' : 'lower';
            this.showMessage(`Wrong! Try a ${hint} number.`, 'error');
        }

        this.updateDisplay();
        this.guessInput.value = '';
    }

    showMessage(message, type) {
        this.messageDisplay.textContent = message;
        this.messageDisplay.className = `message ${type}`;
    }

    updateDisplay() {
        this.attemptsDisplay.textContent = this.attempts;
        this.updateHistory();
    }

    updateHistory() {
        this.historyDisplay.innerHTML = '';
        this.guessHistory.forEach((guess, index) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            const hint = guess < this.targetNumber ? 'Too low' : 'Too high';
            item.textContent = `Attempt ${index + 1}: ${guess} (${hint})`;
            this.historyDisplay.appendChild(item);
        });
    }

    endGame() {
        this.guessInput.disabled = true;
        this.submitButton.disabled = true;
        this.newGameButton.style.display = 'block';
    }

    startNewGame() {
        this.targetNumber = this.generateRandomNumber();
        this.attempts = 10;
        this.guessHistory = [];
        this.guessInput.disabled = false;
        this.submitButton.disabled = false;
        this.newGameButton.style.display = 'none';
        this.messageDisplay.textContent = '';
        this.messageDisplay.className = 'message';
        this.updateDisplay();
    }
}

const game = new NumberGuessingGame(); 