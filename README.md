# Hangman Game - COMP2132 Project

Ann interactive Hangman game built with HTML, CSS (compiled from SASS), and vanilla JavaScript.

## Features

- **Random Word Selection**: Words and hints are randomly selected from a JSON file
- **Interactive Gameplay**: Players can guess letters using an on-screen keyboard or text input
- **Visual Feedback**: Hangman graphic updates with each wrong guess
- **Animations**: Smooth fade-in animations for better user experience
- **Responsive Design**: Works on desktop and mobile devices
- **Play Again**: Easy restart functionality after game ends

## Technical Implementation

### Technologies Used
- **HTML5**: Semantic structure
- **SASS/CSS**: Styled with SASS featuring mixins and compiled to CSS
- **JavaScript**: Object-oriented approach with custom functions and objects
- **JSON**: Data storage for words and hints loaded via fetch API

### Key Features Implemented

1. Words and hints loaded from JSON file via HTTP fetch request  
2. 7 hangman images (stages 0-6) for visual progression  
3. Letter input validation and duplicate guess prevention  
4. Win/Loss detection with game over modal  
5. Play Again functionality with complete game reset  
6. SASS compiled to CSS with custom mixin  
7. JavaScript animations (fade-in effects)  
8. Custom JavaScript functions and Game object  
9. All relative paths (no absolute or server root paths)  

## File Structure

```
COMP2132Project/
├── index.html          # Main game HTML
├── README.md          # Project documentation
├── .gitignore         # Git ignore file
├── css/               # Styles folder
│   ├── styles.scss    # SASS source with mixin
│   ├── styles.css     # Compiled CSS
│   └── styles.css.map # CSS source map
├── js/                # JavaScript folder
│   └── game.js        # Game logic and functions
├── data/              # Data folder
│   └── words.json     # Game words and hints
└── images/            # Hangman graphics
    ├── hangman-0.png  # Empty gallows
    ├── hangman-1.png  # Head
    ├── hangman-2.png  # Body
    ├── hangman-3.png  # Left arm
    ├── hangman-4.png  # Right arm
    ├── hangman-5.png  # Left leg
    └── hangman-6.png  # Right leg (game over)
```

## How to Run

### Local Development
1. Clone this repository
2. Open a terminal in the project directory
3. Start a local HTTP server:
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

4. Open your browser and navigate to `http://localhost:8000`

### Important Note
The game **must** be run through a local server (not directly opening index.html) because it uses the fetch API to load the JSON file, which requires HTTP protocol.

## How to Play

1. The game will randomly select a word and display a hint
2. Guess letters by:
   - Typing in the input box and pressing "Guess" or Enter
   - Clicking letter buttons on the on-screen keyboard
3. Correct guesses reveal the letters in their positions
4. Wrong guesses add body parts to the hangman
5. Win by guessing all letters before 6 wrong guesses
6. Lose if you make 6 wrong guesses
7. Click "Play Again" to start a new game

## Game Rules

- Maximum 6 wrong guesses allowed
- Each letter can only be guessed once
- Only letters A-Z are valid
- Game ends when you win (all letters guessed) or lose (6 wrong guesses)
- Cannot continue guessing after game ends - must click "Play Again"

## Code Highlights

### JavaScript Object
The game uses a main `HangmanGame` object to encapsulate all game state and logic:
```javascript
const HangmanGame = {
    words: [],
    currentWord: '',
    wrongGuesses: 0,
    // ... methods for game logic
}
```

### SASS Mixin
Custom button styling mixin with hover effects:
```scss
@mixin button-style($bg-color, $hover-color, $text-color: white) {
    background-color: $bg-color;
    color: $text-color;
    // ... styles with transitions
}
```

### Animation Functions
Fade-in animation implemented in JavaScript:
```javascript
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in`;
    setTimeout(() => { element.style.opacity = '1'; }, 10);
}
```

## Development

To add more words:
1. Edit `data/words.json`
2. Add new word-hint pairs to the array
3. Refresh browser - changes take effect immediately
 


