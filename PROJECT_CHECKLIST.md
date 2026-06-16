# COMP2132 Project Checklist

## Project Requirements Completion

### General Requirements ✅
- [x] Randomly select a word and hint from a collection
- [x] User can guess letters via input box
- [x] Display correctly guessed letters in their positions
- [x] Display hangman graphic for incorrect guesses
- [x] Disable letters after they're guessed
- [x] Maximum 6 incorrect guesses allowed
- [x] Detect win condition (all letters guessed)
- [x] Detect loss condition (6 wrong guesses)
- [x] Display game results (Won/Lost)
- [x] "Play Again" option
- [x] Prevent guessing after game ends
- [x] Reset everything on "Play Again"

### Technical Requirements ✅
- [x] Words and hints in JSON format
- [x] Loaded via fetch request over HTTP
- [x] High-quality CSS styling with careful design
- [x] At least 6 images (we have 7: hangman-0.png through hangman-6.png)
- [x] All relative paths (no / or C:/ paths)
- [x] HTML/CSS/JavaScript free of serious errors
- [x] Well-tabbed code with descriptive variable names
- [x] One or more custom functions
- [x] One or more custom Objects (HangmanGame object)
- [x] At least one JavaScript animation (fadeIn effects)
- [x] CSS compiled from SASS
- [x] SASS includes at least one mixin (@mixin button-style)
- [x] Both .css and .scss files included
- [x] Ready for Github.com repository

## Project Structure

```
COMP2132Project/
├── index.html          ✅ Main HTML file
├── README.md           ✅ Documentation
├── .gitignore          ✅ Git configuration
├── css/
│   ├── styles.scss     ✅ SASS source with mixin
│   ├── styles.css      ✅ Compiled CSS
│   └── styles.css.map  ✅ Source map
├── js/
│   └── game.js         ✅ Game logic (Object + Functions)
├── data/
│   └── words.json      ✅ 15 words with hints
└── images/
    ├── hangman-0.png   ✅ Stage 0 (empty gallows)
    ├── hangman-1.png   ✅ Stage 1 (head)
    ├── hangman-2.png   ✅ Stage 2 (body)
    ├── hangman-3.png   ✅ Stage 3 (left arm)
    ├── hangman-4.png   ✅ Stage 4 (right arm)
    ├── hangman-5.png   ✅ Stage 5 (left leg)
    └── hangman-6.png   ✅ Stage 6 (right leg - game over)
```

## Key Features

### JavaScript Object
- **HangmanGame**: Main game object with properties and methods
  - Properties: words, currentWord, currentHint, guessedLetters, wrongGuesses, gameOver
  - Methods: init(), loadWords(), startNewGame(), handleGuess(), etc.

### JavaScript Functions
- **fadeIn()**: Animation function
- **fadeOut()**: Animation function
- **getRandomElement()**: Utility function
- **isValidLetter()**: Validation function

### SASS Mixin
```scss
@mixin button-style($bg-color, $hover-color, $text-color: white) {
    // Reusable button styling with transitions
}
```

### JavaScript Animations
- Fade-in effects on:
  - Page load (header, game container)
  - Letter reveals
  - Hangman image updates
  - Modal display

## How to Test

1. Start local server:
   ```bash
   python -m http.server 8000
   ```

2. Open browser: `http://localhost:8000`

3. Test all features:
   - [ ] Word loads with hint
   - [ ] Can guess via input box + button
   - [ ] Can guess via on-screen keyboard
   - [ ] Correct guesses reveal letters
   - [ ] Wrong guesses update hangman image
   - [ ] Letters disable after use
   - [ ] Can't guess same letter twice
   - [ ] Win detection works
   - [ ] Loss detection works
   - [ ] Modal shows correct message
   - [ ] Play Again resets everything
   - [ ] Animations work smoothly

## Submission Steps

1. ✅ Create project with all requirements
2. ✅ Organize folder structure
3. ⏳ Initialize Git repository
4. ⏳ Create initial commit
5. ⏳ Push to GitHub.com
6. ⏳ Email instructor with GitHub URL

### Email Template
```
To: jeffrey_parker@bcit.ca
From: [your]@my.bcit.ca
Subject: COMP2132 Project

GitHub Repository URL: https://github.com/[username]/[repository-name]
```

## Notes
- Game requires HTTP server (uses fetch API)
- All paths are relative
- Both SCSS and CSS files included
- Code is well-commented and formatted
- Mobile responsive design included
