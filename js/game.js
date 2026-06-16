// Game Object - Main game state and logic using jQuery
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
            const data = await $.getJSON('data/words.json');
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
        $('#letter-input').val('').prop('disabled', false);
        $('#guess-button').prop('disabled', false);
    },

    setupEventListeners: function() {
        $('#guess-button').on('click', () => this.handleGuess());

        $('#letter-input').on('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });

        $('#letter-input').on('input', function() {
            $(this).val($(this).val().toUpperCase().replace(/[^A-Z]/g, ''));
        });

        $('#play-again-button').on('click', () => this.startNewGame());

        $('.letter-btn').on('click', (e) => {
            const letter = $(e.target).data('letter');
            this.makeGuess(letter);
        });
    },

    handleGuess: function() {
        const letter = $('#letter-input').val().toUpperCase().trim();

        if (letter === '') {
            this.showMessage('Please enter a letter!');
            Animations.shake('#letter-input');
            return;
        }

        if (!/^[A-Z]$/.test(letter)) {
            this.showMessage('Please enter a valid letter (A-Z)!');
            Animations.shake('#letter-input');
            return;
        }

        $('#letter-input').val('');
        this.makeGuess(letter);
    },

    makeGuess: function(letter) {
        if (this.gameOver) return;

        if (this.guessedLetters.includes(letter)) {
            this.showMessage('You already guessed that letter!');
            Animations.pulse('#letter-input');
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
        const letterBoxes = $('.letter-box');
        this.currentWord.split('').forEach((char, index) => {
            if (char === letter) {
                const $box = $(letterBoxes[index]);
                $box.text(letter);
                Animations.revealLetter($box);
            }
        });
    },

    handleWrongGuess: function() {
        this.wrongGuesses++;
        const $hangmanImage = $('#hangman-image');
        $hangmanImage.attr('src', `images/hangman-${this.wrongGuesses}.png`);
        Animations.shake($hangmanImage);
    },

    updateDisplay: function() {
        this.updateHintDisplay();
        this.updateWordDisplay();
        this.updateStatsDisplay();
    },

    updateHintDisplay: function() {
        $('#hint-text').text(this.currentHint);
    },

    updateWordDisplay: function() {
        const $wordContainer = $('#word-container');
        $wordContainer.empty();

        this.currentWord.split('').forEach(letter => {
            const $letterBox = $('<div>').addClass('letter-box');

            if (this.guessedLetters.includes(letter)) {
                $letterBox.text(letter).addClass('revealed');
            }

            $wordContainer.append($letterBox);
        });
    },

    updateStatsDisplay: function() {
        $('#wrong-count').text(this.wrongGuesses);

        if (this.wrongGuesses > 0) {
            Animations.pulse('#wrong-count');
        }
    },

    disableLetter: function(letter) {
        $('.letter-btn').each(function() {
            if ($(this).data('letter') === letter) {
                $(this).prop('disabled', true).addClass('used').fadeOut(200).fadeIn(200);
            }
        });
    },

    enableAllLetters: function() {
        $('.letter-btn').prop('disabled', false).removeClass('used');
    },

    checkGameStatus: function() {
        const allLettersGuessed = this.currentWord.split('').every(letter =>
            this.guessedLetters.includes(letter)
        );

        if (allLettersGuessed) {
            setTimeout(() => this.endGame(true), 500);
        } else if (this.wrongGuesses >= this.maxWrongGuesses) {
            setTimeout(() => this.endGame(false), 500);
        }
    },

    endGame: function(won) {
        this.gameOver = true;
        $('#letter-input').prop('disabled', true);
        $('#guess-button').prop('disabled', true);

        const $resultElement = $('#game-result');
        const $correctWordElement = $('#correct-word');

        if (won) {
            $resultElement.text('🎉 Congratulations! You Won! 🎉').css('color', '#2ecc71');
            $correctWordElement.text(`You correctly guessed: ${this.currentWord}`);
        } else {
            $resultElement.text('😢 Game Over! You Lost! 😢').css('color', '#e74c3c');
            $correctWordElement.text(`The correct word was: ${this.currentWord}`);
        }

        this.showModal();
    },

    showModal: function() {
        const $modal = $('#game-over-modal');
        $modal.removeClass('hidden');
        Animations.fadeIn($modal, 400);
        Animations.bounce('.modal-content');
    },

    hideModal: function() {
        $('#game-over-modal').addClass('hidden');
    },

    showMessage: function(message) {
        const $input = $('#letter-input');
        $input.attr('placeholder', message);
        setTimeout(() => {
            $input.attr('placeholder', 'A-Z');
        }, 2000);
    }
};
