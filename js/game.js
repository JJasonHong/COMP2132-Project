// Game Object - Main game state and logic
const HangmanGame = {
    words: [],
    currentWord: '',
    currentHint: '',
    guessedLetters: [],
    wrongGuesses: 0,
    maxWrongGuesses: 6,
    gameOver: false,

    init: function() {
        this.loadWords();
        this.setupEventListeners();
    },

    loadWords: async function() {
        try {
            const response = await fetch('data/words.json');
            const data = await response.json();
            this.words = data.words;
            this.startNewGame();
        } catch (error) {
            console.error('Error loading words:', error);
            alert('Error loading game data. Please refresh the page.');
        }
    },

    startNewGame: function() {
        this.wrongGuesses = 0;
        this.guessedLetters = [];
        this.gameOver = false;

        const randomIndex = Math.floor(Math.random() * this.words.length);
        const selectedWord = this.words[randomIndex];
        this.currentWord = selectedWord.word;
        this.currentHint = selectedWord.hint;

        this.updateDisplay();
        this.enableAllLetters();
        this.hideModal();
        document.getElementById('letter-input').value = '';
        document.getElementById('letter-input').disabled = false;
        document.getElementById('guess-button').disabled = false;
    },

    setupEventListeners: function() {
        const guessButton = document.getElementById('guess-button');
        const letterInput = document.getElementById('letter-input');
        const playAgainButton = document.getElementById('play-again-button');

        guessButton.addEventListener('click', () => this.handleGuess());

        letterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });

        letterInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
        });

        playAgainButton.addEventListener('click', () => this.startNewGame());

        const letterButtons = document.querySelectorAll('.letter-btn');
        letterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const letter = e.target.dataset.letter;
                this.makeGuess(letter);
            });
        });
    },

    handleGuess: function() {
        const input = document.getElementById('letter-input');
        const letter = input.value.toUpperCase().trim();

        if (letter === '') {
            this.showMessage('Please enter a letter!');
            return;
        }

        if (!/^[A-Z]$/.test(letter)) {
            this.showMessage('Please enter a valid letter (A-Z)!');
            return;
        }

        input.value = '';
        this.makeGuess(letter);
    },

    makeGuess: function(letter) {
        if (this.gameOver) return;

        if (this.guessedLetters.includes(letter)) {
            this.showMessage('You already guessed that letter!');
            return;
        }

        this.guessedLetters.push(letter);
        this.disableLetter(letter);

        if (this.currentWord.includes(letter)) {
            this.handleCorrectGuess(letter);
        } else {
            this.handleWrongGuess();
        }

        this.updateDisplay();
        this.checkGameStatus();
    },

    handleCorrectGuess: function(letter) {
        const letterBoxes = document.querySelectorAll('.letter-box');
        this.currentWord.split('').forEach((char, index) => {
            if (char === letter) {
                letterBoxes[index].textContent = letter;
                letterBoxes[index].classList.add('revealed');
                fadeIn(letterBoxes[index]);
            }
        });
    },

    handleWrongGuess: function() {
        this.wrongGuesses++;
        const hangmanImage = document.getElementById('hangman-image');
        hangmanImage.src = `images/hangman-${this.wrongGuesses}.png`;
        fadeIn(hangmanImage);
    },

    updateDisplay: function() {
        this.updateHintDisplay();
        this.updateWordDisplay();
        this.updateStatsDisplay();
    },

    updateHintDisplay: function() {
        const hintText = document.getElementById('hint-text');
        hintText.textContent = this.currentHint;
    },

    updateWordDisplay: function() {
        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = '';

        this.currentWord.split('').forEach(letter => {
            const letterBox = document.createElement('div');
            letterBox.className = 'letter-box';

            if (this.guessedLetters.includes(letter)) {
                letterBox.textContent = letter;
                letterBox.classList.add('revealed');
            }

            wordContainer.appendChild(letterBox);
        });
    },

    updateStatsDisplay: function() {
        const wrongCount = document.getElementById('wrong-count');
        wrongCount.textContent = this.wrongGuesses;
    },

    disableLetter: function(letter) {
        const letterButtons = document.querySelectorAll('.letter-btn');
        letterButtons.forEach(button => {
            if (button.dataset.letter === letter) {
                button.disabled = true;
                button.classList.add('used');
            }
        });
    },

    enableAllLetters: function() {
        const letterButtons = document.querySelectorAll('.letter-btn');
        letterButtons.forEach(button => {
            button.disabled = false;
            button.classList.remove('used');
        });
    },

    checkGameStatus: function() {
        const allLettersGuessed = this.currentWord.split('').every(letter =>
            this.guessedLetters.includes(letter)
        );

        if (allLettersGuessed) {
            this.endGame(true);
        } else if (this.wrongGuesses >= this.maxWrongGuesses) {
            this.endGame(false);
        }
    },

    endGame: function(won) {
        this.gameOver = true;
        document.getElementById('letter-input').disabled = true;
        document.getElementById('guess-button').disabled = true;

        const resultElement = document.getElementById('game-result');
        const correctWordElement = document.getElementById('correct-word');

        if (won) {
            resultElement.textContent = '🎉 Congratulations! You Won! 🎉';
            resultElement.style.color = '#2ecc71';
            correctWordElement.textContent = `You correctly guessed: ${this.currentWord}`;
        } else {
            resultElement.textContent = '😢 Game Over! You Lost! 😢';
            resultElement.style.color = '#e74c3c';
            correctWordElement.textContent = `The correct word was: ${this.currentWord}`;
        }

        this.showModal();
    },

    showModal: function() {
        const modal = document.getElementById('game-over-modal');
        modal.classList.remove('hidden');
        fadeIn(modal);
    },

    hideModal: function() {
        const modal = document.getElementById('game-over-modal');
        modal.classList.add('hidden');
    },

    showMessage: function(message) {
        const input = document.getElementById('letter-input');
        input.placeholder = message;
        setTimeout(() => {
            input.placeholder = 'A-Z';
        }, 2000);
    }
};

// Animation Functions
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;

    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

function fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = '0';

    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

// Utility Functions
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function isValidLetter(char) {
    return /^[A-Z]$/.test(char);
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    HangmanGame.init();
});
