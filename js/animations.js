// Animation utility functions using jQuery

const Animations = {
    fadeIn: function(element, duration = 300) {
        $(element).fadeIn(duration);
    },

    fadeOut: function(element, duration = 300) {
        return $(element).fadeOut(duration).promise();
    },

    slideDown: function(element, duration = 400) {
        $(element).slideDown(duration);
    },

    slideUp: function(element, duration = 400) {
        return $(element).slideUp(duration).promise();
    },

    bounce: function(element) {
        $(element).animate({
            marginTop: '-=10px'
        }, 100).animate({
            marginTop: '+=10px'
        }, 100);
    },

    pulse: function(element) {
        $(element).animate({
            opacity: 0.5
        }, 200).animate({
            opacity: 1
        }, 200);
    },

    shake: function(element) {
        const $el = $(element);
        const originalPosition = $el.css('position');

        $el.css('position', 'relative');

        $el.animate({ left: '-10px' }, 50)
           .animate({ left: '10px' }, 50)
           .animate({ left: '-10px' }, 50)
           .animate({ left: '10px' }, 50)
           .animate({ left: '0' }, 50, function() {
               $el.css('position', originalPosition);
           });
    },

    revealLetter: function(element) {
        $(element).addClass('revealed')
                  .hide()
                  .fadeIn(400)
                  .animate({
                      fontSize: '+=5px'
                  }, 100)
                  .animate({
                      fontSize: '-=5px'
                  }, 100);
    }
};
