// Main initialization script using jQuery
$(document).ready(function() {
    console.log('Hangman Game Loading...');

    // Initialize the game
    HangmanGame.init();

    // Add initial page animations
    $('header').hide().slideDown(800);
    $('.game-container').hide().fadeIn(1000);

    // Add hover effects to keyboard buttons
    $('.letter-btn').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            if (!$(this).hasClass('used')) {
                $(this).css('transform', 'scale(1)');
            }
        }
    );

    // Focus on input field when page loads
    setTimeout(() => {
        $('#letter-input').focus();
    }, 1000);

    // Add keyboard support for the entire document
    $(document).on('keypress', function(e) {
        if ($('#game-over-modal').hasClass('hidden')) {
            const key = e.key.toUpperCase();
            if (/^[A-Z]$/.test(key) && !$('#letter-input').is(':focus')) {
                HangmanGame.makeGuess(key);
            }
        }
    });

    console.log('Hangman Game Ready!');
});
