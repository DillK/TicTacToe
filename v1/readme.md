# **Disclaimer**
>*Disclaimer: **This is not a tutorial**. I am decidedly not an expert. While I do my best to strive for best practices, I do not guarantee them. I'm writing this simply as a means of journaling my own development. I will try to make this document as informative as I can. However, this should not be treated as anything more than the ramblings of a lunatic with a \[D]ill-informed opinion. If other people find this useful though − great!*

# Overview
As a programming exercise I decided to brush up on some web development. Specifically I wanted to take a closer look at HTML / JavaScript / CSS / Canvas. I needed a simple project to give them a try, and what is simpler than the age old game Tic Tac Toe? Whilst **this is not a tutorial *per se***, I have every intention of writing very detailed comments and accounts documenting my efforts. If others find it useful? Well than that's 🔥**LIT**🔥

# Goals
1. [x] Write a playable game of Tic Tac Toe.
1. [x] Use only HTML, CSS, and JavaScript.
1. [x] Implement and animate a player turn indicator.
1. [x] Make the Game responsive to screen sizes.
1. [x] Use Canvas to draw the game board, and handle player input.

# The End Result
![Example 0](https://kdill.ca/wp-content/uploads/2020/04/tictactoe0-284x300.jpg)

Looks great! Now let's go over how we got there ...

# Step 1 - The HTML and CSS
I really don't want to complicate things yet, so for now we're going to keep it simple and go with some bare bones HTML. For now we will only create 2 components - the Player Turn Indicator and Game Board. Because it's easy we'll also throw in the script initializing the game (it will throw a console error for now, but 🤷‍♀️). Here's the HTML and accompanying CSS:

## The HTML
```html
<!DOCTYPE html>
<html>

<head>
  <title>Tic Tac Toe</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Tic Tac Toe -->
  <link rel="stylesheet" type="text/css" href="style.css">
  <script src="game.js"></script>
</head>

<body>
  <div id="game-wrapper">
    <div id="game">
      <div id="player-bar">
        <span id="p1" class="player-label">
          Player 1
        </span>
        <span id="p2" class="player-label">
          Player 2
        </span>
        <span id="player-turn-indicator">
        </span>
      </div>
      <canvas id="game-canvas"></canvas>
    </div>
  </div>
  <script>
    var game = new TicTacToeGame();
  </script>
</body>

</html>
```
## The CSS
```css
html{
  background: #181a1b;
  color: #fff;
  font-family: 'Arial', sans-serif;
  line-height: 16px;
  font-size: 16px;
}

html, body{
  padding: 0;
  margin: 0;
}

body{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#game-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(100% - 2em);
  height: calc(100% - 2em);
}

#player-bar{
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 3em;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#player-turn-indicator{
  width: 1.5em;
  height: 1.5em;
  border-radius: 1em;
  background-color: #fff;
  position: absolute;
  left: calc(50% - 0.75em);
  z-index: 1;
  transition: left ease 0.5s, width ease 0.25s;
}

#game-canvas{
  background-color: #303030;
}

.player-label{
  margin: 0.5em;
  z-index: 2;
  font-weight: bold;
  mix-blend-mode: difference;
}
```
The only really important things to note are we hard coded our line height and EM values (16px). This will be important for sizing things in our scripts later.

In addition we positioned the player turn indicator absolutely, which we will control through script to help indicate which player is active. We'll use the 'left' and 'width' attributes to adjust the position of the indicator, making use of CSS's transition to give it a nice smooth animated effect.

Lastly we set the height of the player bar. Again, this will be important for sizing later. Beyond that, the CSS is fairly straight forward.

We should now have something that looks like ...

![Example 1](https://kdill.ca/wp-content/uploads/2020/04/tictactoe1-300x196.jpg)

We do? 🔥🔥🔥**GREAT!**🔥🔥🔥

# Step 2 - The Player indicator
I know. It's a weird place to start going over the script. The player indicator will be dependant / controlled by our game in our scripts though, and it's pretty simple, so let's just knock it out of the way quickly and move on to the next step:

## Player Indicator
```javascript
/**
 * Class used to represent and indicate a TicTacToe game's Player Turn.
 */
class TicTacToePlayerTurnIndicator {
  /**
   * @param {number} _EM - Private Constant represent the default EM value of the HTML element in px.
   * It assists in helping measure the layouts used.
   */
  _EM;

  /**
   * @param {HTMLElement} _indicator - Private variable to hold the HTML Element that represents Player Turn Indicator
   */
  _indicator;

  /**
   * @param {number} _currentPlayer - Private variable to hold the active current player.
   */
  _currentPlayer = 0;

  /**
   * Represents an indicator for TicTacToe Player Turn. Is used to update the respective HTML elements.
   * @constructor
   * @param {number} EM - The HTML elements constant EM measurement
   */
  constructor(EM) {
    this._EM = EM;
    this._indicator = document.getElementById("player-turn-indicator");
  }

  /**
   * This function updates the player indicator for either Player 1, Player 2, Neutral, or redraw.
   * 
   * @param {0 | 1 | 2 | any} player - Is used to indicate which players turn it is.
   * Accepted values are 0, 1, 2, or -1.
   * 0 is the neutral position.
   * 1 and 2 indiciates either respective active players.
   * Anything else simply fallbacks to updating the current player (when a redraw may be needed).
   */
  setPlayer(player) {
    player = player != 0 && player != 1 && player != 2 ? this._currentPlayer : player;
    this._currentPlayer = player;
    this.update();
  }

  /**
   * This function updates the player indicator elements position within its parent element.
   */
  update() {
    // Parent is required for indicator positioning
    let parentWidth = this._indicator.parentElement.offsetWidth;

    // Moves the indicator to either Player 1, Player 2, or the Neutral positions
    // Player 1
    if (this._currentPlayer === 1) {
      this._indicator.style.left = "0px";
      this._indicator.style.width = "" + (this._EM * 5) + "px";
    }
    // Player 2
    else if (this._currentPlayer === 2) {
      let w = parentWidth - (this._EM * 5);
      this._indicator.style.left = "" + w + "px";
      this._indicator.style.width = "" + (this._EM * 5) + "px";
    }
    // Neutral
    else {
      this._indicator.style.left = "" + ((parentWidth / 2) - (this._EM * 0.75)) + "px";
      this._indicator.style.width = "" + (this._EM * 1.5) + "px";
    }
  }
}
```
Neat. So what's important to note here is that we are using that EM constant that we noted in the above CSS. If EM were variable, it would mess up our sizing. We could account for EM being variable, but it severely complicates things. As they say - 💋 Keep It Simple Stupid 💋

Anyway, all the variables are both straight forward, and private. We can let the above code snippet speak for itself. The two functions, setPlayer and update, are important though.

setPlayer will update which player is currently active, and then trigger an update. Update gives a visual queue of which player is set to active by moving horizontally between the three possible states; Player 1, Neutral (in between the two players), and Player 2. setPlayer's fallback and update can also be called to simply update the indicator's position inside of it's parent - this will be useful for responsively sizing the game.

Ok. Now that is out of the way let's move on ...

# Step 3 - Modeling Tic Tac Toe
Before we get to the meat and potatoes of the project, let us first get some modeling out of the way.

## The Rules of Tic Tac Toe
Tic Tac Toe is a game between two players. One player is represented with the symbol **X**, and the other with the symbol **O**. The players will play on a board comprised of a empty n x n grid, where n is greater than 2. The standard default is a 3 x 3 grid. Each cell in the grid can be either **Empty / X / O**. In alternating turns the players will place their symbols on the grid. A player cannot replace the other players symbol. In order to win the game the players need to get their symbols in linear line across the entire board either by row, column, or diagonally. If all the cells are filled, and neither player has met the win conditions, the game ends in a tie.

With this information we can start modeling our game.

## Modeling
Let's start with the TicTacToeCell. So let's review our requirements:
1. ✅ A cell can have 3 values - **Empty / X / O**
2. ✅ A cell can be a part of a win condition.

Easy!

## TicTacToeCell
```javascript
/**
 * Struct to hold the relevant values for Tic Tac Toe
 */
class TicTacToeCell {
  /**
   * @param {number} contains - Values can be 1 or 2 for the respective players moves, or 0 for 'empty'.
   */
  contains = 0;

  /**
   * @param {boolean} winner - Indicates whther this cell is a winning move.
   */
  winner = false;
}
```
The snippet is brief, so I won't waste much time explaining it.

Next lets go over the TicTacToe game state. The requirements are:
1. ✅ A n x n grid of TicToeToeCells - the board.
1. ✅ We need to know the grid size.
1. ✅ We need to track the active player.
1. ✅ We need to know if the game is won.
1. ✅ We need to know if the game is out of moves (a tie).

```javascript
/**
 * Class used to represent the Tic Tac Toe game state.
 */
class TicTacToeGameState {
  /**
   * @param {number} _gridSize - Private value used for tracking the size of the grid being used.
   */
  _gridSize;

  /**
   * @param {TicTacToeCell[][]} board - A 2 dimensional array of Tic Tac Toe Cells, representing the gameboard.
   */
  board = [];

  /**
   * @param {number} gameTurn - Keeps track of the current game turn.
   */
  gameTurn = 0;   // even turns are Player 1 (X's) and odd turns are Player 2 (O's)

  /**
   * @param {boolean} isGameWon - Represents whether or not the game has been won
   */
  isGameWon = false;

  /**
   * @param {boolean} isGameOutOfMoves - Represents whether or not the game has run out of viable moves (a Tie).
   */
  isGameOutOfMoves = false;

  /**
   * @param {number} gridSize - Read Only value for the size of the grid being used for the Tic Tac Toe game.
   */
  get gridSize() {
    return this._gridSize;
  }

  /**
   * Represents an indicator for TicTacToe Player Turn. Is used to update the respective HTML elements.
   * @constructor
   * @param {number} gridSize - The square root of the grid to be used. Defaults to 3. Cannot be less than 2.
   */
  constructor(gridSize) {
    // Setup grid size. Defaults to 3. Cannot be less than 2.
    this._gridSize = (gridSize === null || gridSize === undefined || gridSize < 2) ? 3 : gridSize;

    // Board setup
    this.board = []
    for (let x = 0; x < this._gridSize; x++) {
      this.board[x] = [];
      for (let y = 0; y < this._gridSize; y++) {
        this.board[x][y] = {
          contains: 0,
          winner: false
        };
      }
    }
  }
}
```
I did my best to comment the snippet, and hopefully it speaks for itself. It's relatively straight forward. What's most important to note is the board param. It is a 2 dimensional array of Tic Tac Toe Cells, and where much of the games logic will take place.

I feel I should also note that this is just a representation of the game state, and does not have any logic stored within.

Moving on!

# Step 4 - The Game Logic
Now we can finally start pulling all the pieces together. Let's start with by creating our Game class, and writing all our required parameters ...

```javascript
/**
 * Class to create a new Tic Tac Toe Game
 */
class TicTacToeGame {
  /**
   * @param {number} _EM - Private Constant represent the default EM value of the HTML element in px.
   * It assists in helping measure the layouts used.
   */
  _EM;

  /**
   * @param {number} _size - Private variable to hold the displayed size of our Game. Used for size and resizing.
   */
  _size;

  /**
   * @param {TicTacToePlayerTurnIndicator} _playerTurnIndicator - Private variable to hold the Player Turn Indicator for our game.
   */
  _playerTurnIndicator;

  /**
   * @param {TicTacToeGameState} _state - Private variable to hold the Tic Tac Toe game state.
   */
  _state = new TicTacToeGameState();

  // HTML Elements
  /**
   * @param {HTMLElement} _canvas - Private variable to hold the HTML Canvas for our Tic Tac Toe game.
   */
  _canvas;

  /**
   * @param {HTMLElement} _canvas - Private variable to hold the Canvas Context for our Tic Tac Toe game.
   */
  _context;

  // Drawing params
  /**
   * @param {number} _colWidth - Private variable to hold the column width for our game grid.
   */
  _colWidth;

  /**
   * @param {number} _rowHeight - Private variable to hold the row height for our game grid.
  */
  _rowHeight;
}
```
Ok. So the Turn Indicator and Game State have already been touched on, so we'll ignore these for now. Let's look at the rest of the params:

- EM
- Size
- colWidth
- rowHeight

As described in the comments, EM is a constant we'll use for scaling and sizing our game. Size too will be kept for measuring. Moving on:

- canvas
- context

Canvas is the HTML element for our game board, and what we will be using to adjust all our aforementioned measurements. Canvas is simply a BMP image, with an included drawing API to output graphics. Perfect for drawing simple 2D games. We access that API by calling it's 'context'. We'll touch on these more in a bit.

Ok. Let's look at the constructor next ...

```javascript
class TicTacToeGame
  
  ...

 /**
   * Represent a Tic Tac Toe Game
   * @constructor
   */
  constructor() {
    // Grabs the default EM size of the document to assist with layout and drawing
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);

    this._canvas = document.getElementById("game-canvas");
    this._context = this._canvas.getContext("2d");

    this._playerTurnIndicator = new TicTacToePlayerTurnIndicator(this._EM);

    // Initial sizing and draw
    this.resizeGame();
    this.drawBoard();

    // Create an observer function to respond to application resizing
    const resiveObserver = new ResizeObserver(observer => {
      this.resizeGame();
      this.drawBoard();
    });
    resiveObserver.observe(document.getElementById("game-wrapper"));

    // Event listener for player input
    this._canvas.addEventListener("mousedown", this.boardActivationEventListener.bind(this), false);
  }

  ...
```
Alrighty. So let's just briefly touch on the constructor code. First we start by grabbing our EM constant, which we've already touched on above. It's done by pulling the computed value straight from the HTML Document object.

Next is straight forward. We get our document element for our Canvas, and grab its context. Then we create the TicTacToePlayerTurnIndicator controller.

The next three sections are resizing, drawing, and adding event listeners. We'll go over each separately, but let's start with resizing.

Before looking at the resize function, let's go over what this section does ...

```javascript
// Create an observer function to respond to application resizing
    const resiveObserver = new ResizeObserver(observer => {
      this.resizeGame();
      this.drawBoard();
    });
    resiveObserver.observe(document.getElementById("game-wrapper"));
```
This section creates a resize observer. This observer reacts to any computed size change of 'game-wrapper', and then fires it's related functions. Observers are an excellent, and useful design pattern, however they have very limited implementation in JavaScript. Observables have been proposed for ECMAScript (the design body that oversees JavaScript), but have not been approved. In the meantime we have varied support for observables. ResizeObserver is widely supported by the browser vendors for the time being, is super convenient for reacting to resizing events, so therefore we will use it.

Ok, let's look at the actual resize function ...

```javascript
  /**
   * Responsively scales the game to fit the display screen.
   */
  resizeGame() {
    let game = this._canvas.parentElement;
    let wrapper = game.parentElement;

    // Checks which is larger, game wrapper width or height, and uses the samller for sizing the game
    let s = wrapper.offsetHeight <= wrapper.offsetWidth ? wrapper.offsetHeight : wrapper.offsetWidth;

    // 3 em for height of the player bar
    let pad = this._EM * 3;

    // Size elements to fit screen
    this._size = s - pad;
    this._canvas.width = this._size;
    this._canvas.height = this._size;
    this._context.innerWidth = this._size;
    this._context.innerHeight = this._size;

    // Adjusts the gride sizing
    this._colWidth = this._size / this._state.gridSize;
    this._rowHeight = this._size / this._state.gridSize;

    // Adjusts player indicator
    this._playerTurnIndicator.update();
  }
```
The function uses a bit of math, but it's not particularly difficult.

First we grab the relevant elements.

Second we test if we are in a landscape or portrait display by analyzing the wrapper size. We will use these measurements to scale the canvas elements up to fit the the screen.

Third segment has a caveat. What's important to note is that the Canvas size, as rendered by the browser, is not necessarily its context's size. If the canvas were to, for example, fill the whole browser window and be rendered at (arbitrary number) 1920x1080 pixels, the context could have a different internal resolution like 640x480 px. **CSS does not adjust the contexts internal resolution.** To make sure everything stays nice and sharp though we adjust the contexts inner width and height. Beyond that we add a little padding to make things nice, and scale everything appropriately.

The fourth segment sets our row height and col width, which are used to place and draw our grid cells.

Lastly we update the player indicator.

Cool. Our board now has responsively sized and scaled measurements. Let's look at the draw function ...

```javascript
/**
   * Draws the current game state to the canvas.
   */
  drawBoard() {
    // Adjust player indicator
    if (this._state.isGameWon || this._state.isGameOutOfMoves || this._state.gameTurn === 0) {
      this._playerTurnIndicator.setPlayer(0);
    }
    else if (this._state.gameTurn % 2 === 0) {
      this._playerTurnIndicator.setPlayer(1);
    }
    else {
      this._playerTurnIndicator.setPlayer(2);
    }

    // Clear canvas for redrawing, and add canvas styling
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._context.lineWidth = this._EM / 4;
    let strokeColor = this._state.isGameOutOfMoves ? "red" : "white";
    this._context.strokeStyle = strokeColor;

    // Draw column grid lines
    for (let x = 0; x <= this._canvas.width; x += this._colWidth) {
      this._context.beginPath();
      this._context.moveTo(x, 0);
      this._context.lineTo(x, this._canvas.height);
      this._context.stroke();
    }

    // Draw row grid lines
    for (let y = 0; y <= this._canvas.height; y += this._rowHeight) {
      this._context.beginPath();
      this._context.moveTo(0, y);
      this._context.lineTo(this._canvas.width, y);
      this._context.stroke();
    }

    // Draw X's and O's
    this._context.lineWidth = this._EM;
    for (let x = 0; x < this._state.board.length; x++) {
      for (let y = 0; y < this._state.board[x].length; y++) {
        // Sets X's path
        if (this._state.board[x][y].contains === 1) {
          this._context.beginPath();
          this._context.moveTo((x * this._colWidth) + this._EM, (y * this._rowHeight) + this._EM);
          this._context.lineTo(((x + 1) * this._colWidth) - this._EM, ((y + 1) * this._rowHeight) - this._EM);
          this._context.moveTo(((x + 1) * this._colWidth) - this._EM, (y * this._rowHeight) + this._EM);
          this._context.lineTo((x * this._colWidth) + this._EM, ((y + 1) * this._rowHeight) - this._EM);
        }
        // Sets O's path
        else if (this._state.board[x][y].contains === 2) {
          this._context.beginPath();

          let minX = x * this._colWidth;
          let minY = y * this._rowHeight;
          let maxX = (x + 1) * this._colWidth;
          let maxY = (y + 1) * this._rowHeight;

          let radius = (maxX - minX - (this._EM * 2)) / 2;
          let centerX = maxX - ((maxX - minX) / 2);
          let centerY = maxY - ((maxY - minY) / 2);
          this._context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        }
        else continue;

        // Strokes the path
        if (this._state.board[x][y].winner === true) {
          this._context.strokeStyle = "green";
          this._context.stroke();
          this._context.strokeStyle = strokeColor;
        } else {
          this._context.stroke();
        }
      }
    }
  }
```
Awesome. It's a little math dense, but the code itself is fairly straight forward. There are plenty of Canvas tutorials out there, so if you're reading this I won't waste your time by explaining it badly. I will just briefly touch on some of the technology I made use of.

First, we update our indicator whenever we draw the board. We don't have to do any drawing explicitly for the indicator, because it's all handled in CSS - it simply updates with the current player and it will act accordingly.

The next section 'clears' the canvas. Because it's a bitmap whenever we draw to it we reuse the existing BMP data. If we didn't clear it on each draw we would be drawing overtop of the previous data. If we were concerned about performance we could write a more optimized drawing function, where we would only redraw in the canvas regions that are explicitly being altered (IE the specific cell being affected). We may yet do that at a later date, but for now it is fine.

The grid lines are drawn next. Pretty straight forward, but let's just touch on how we have used the API:
- We set our line width. This does exactly what it says, and changes how thick our strokes are.
- We set our stroke color. We will use green when a cell is a winner, red when the game has tied, and otherwise we use white.
- We begin a path. A path in canvas is a set of XY coordinates on the bmp to adjust control to.
- Moving a path adjusts the XY coord without affecting the stroke when used correctly.
- We set lines in the case of grids and X, and set arcs in the case of O.
- We 'stroke' the canvas, which draw the path as we have described it in code.

Great. Let's take a look at the constructor again and the event listener ...

```javascript
  ...

  constructor() {
    ... 

    // Event listener for player input
    this._canvas.addEventListener("mousedown", this.boardActivationEventListener.bind(this), false);
  }

  /**
   * Listens to the game board for player input.
   * @param {*} e - Event for activating the game board
   */
  boardActivationEventListener(e) {
    // If the game is 'completed', reset the game
    if (this._state.isGameWon === true || this._state.isGameOutOfMoves === true) {
      this.resetGame();
    }
    else {
      // XY Coords of event / mouse click
      let xCoords = e.clientX - e.target.offsetLeft;
      let yCoords = e.clientY - e.target.offsetTop;

      // Determine which cell was activated.
      let x = Math.floor(xCoords / this._colWidth);
      let y = Math.floor(yCoords / this._rowHeight);

      this.checkMove(x, y);
    }
  }

  /**
   * Resets the Tic Tac Toe Game
   */
  resetGame() {
    this._state = new TicTacToeGameState();
    this.drawBoard();
  }
```
Cool. So in the constructor we've created a event listener that catches the mouse down event, and then calls the BoardActivationEventListener. That's straight forward.

The boardActivationEventListener has two outcomes. It either resets the game in case of a finished game (win or tie), or validates the user input by determining what cell they've clicked on. Determining the cell is very easy by simply dividing the x and y coordinate of the event with the column width and heights.

After the cell is calculated we verify the move ...
```javascript
/**
   * Checks if the player move input is valid.
   * @param {number} x - The X Position of the Tic Tac Toe Cell.
   * @param {number} y - The Y Position of the Tic Tac Toe Cell.
   */
  checkMove(x, y) {
    let b = this._state.board;
    if (b[x][y].contains === 0) {
      if ((this._state.gameTurn % 2) === 0) {
        b[x][y].contains = 1;
      } else {
        b[x][y].contains = 2;
      }

      // Check row win conditions
      let row = b.length - 1;
      let col = y;
      let rowWin = this.checkRowWinCondition(b[x][y], row, col);

      // Check column win condition
      row = x;
      col = b[x].length - 1;
      let colWin = this.checkColumnWinCondition(b[x][y], row, col);

      // Check diagonal win condition
      row = b.length - 1;
      col = b[x].length - 1;
      let diagWin = this.checkDiagonalWinCondition(b[x][y], row, col);

      // Check reverse diagonal win condition
      row = 0;
      col = b[x].length - 1;
      let maxRow = b.length - 1;
      let reverseDiagWin = this.checkReverseDiagonalWinCondition(b[x][y], row, col, maxRow);

      // Confirm if the game has been won
      if (rowWin === true || colWin === true || diagWin === true || reverseDiagWin === true) {
        this._state.isGameWon = true;
      }

      this._state.gameTurn++;

      if (this._state.gameTurn >= (Math.pow(this._state.gridSize, 2)) && this._state.isGameWon == false) {
        this._state.isGameOutOfMoves = true;
      }

      this.drawBoard();
    }
  }
```
Sweet. So let's run this down:
- We grab the board from the game state.
- If the selected cell is not empty, we ignore the move.
- Otherwise we grab the turn value from the game state, and check which player is acting with modulo. Even is Player 1 (X), even is Player 2 (O).
- Next we test the win conditions. These are all recursive functions. We'll go over these after we wrap up the run down. What's important to note here is that a player can technically achieve multiple win conditions technically with a single move. For example:

![Example 2](https://kdill.ca/wp-content/uploads/2020/04/tictactoe2-291x300.jpg)

- We test if the game is won, advance the turn, and test if the game is won or ran out of turns.
- We finally draw the results.

Let's look at the how we test the win conditions ...

```javascript
/**
   * Recursive function to determine if the reverse diagonal win condition has been met.
   * @param {TicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   * @param {number} maxRow - The end condition for which row will be tested upto.
   */
  checkReverseDiagonalWinCondition(cell, row, col, maxRow) {
    let b = this._state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= maxRow && col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkReverseDiagonalWinCondition(cell, (row + 1), (col - 1), maxRow);
        if (winner === true) {
          b[row][col].winner = true;
        }
        return winner;
      }
    } else {
      return false;
    }
  }

  /**
   * Recursive function to determine if the diagonal win condition has been met.
   * @param {TicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   */
  checkDiagonalWinCondition(cell, row, col) {
    let b = this._state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= 0 && col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkDiagonalWinCondition(cell, (row - 1), (col - 1));
        if (winner === true) {
          b[row][col].winner = true;
        }
        return winner;
      }
    } else {
      return false;
    }
  }

  /**
   * Recursive function to determine if the column win condition has been met.
   * @param {TicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   */
  checkColumnWinCondition(cell, row, col) {
    let b = this._state.board;
    if (b[row][col].contains === cell.contains) {
      if (col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkColumnWinCondition(cell, row, (col - 1));
        if (winner === true) {
          b[row][col].winner = true;
        }
        return winner;
      }
    } else {
      return false;
    }
  }

  /**
  * Recursive function to determine if the row win condition has been met.
  * @param {TicTacToeCell} cell - the current cell being tested.
  * @param {number} row - the current row being tested.
  * @param {number} col - the current column being tested.
  */
  checkRowWinCondition(cell, row, col) {
    let b = this._state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkRowWinCondition(cell, (row - 1), col);
        if (winner === true) {
          b[row][col].winner = true;
        }
        return winner;
      }
    } else {
      return false;
    }
  }
```

It looks more complicated than it is. There are 4 separate win conditions. Either a win by row, win by column, diagonal win, or a reverse diagonal win. Each function is a recursive test, checking the next cell in the line if it contains the same value as the previous cell. If it reaches the end of their respective line and all the symbols have matched, it returns a winner.

# Step 5 - Play Tic Tac Toe

✨✨✨It works!✨✨✨ Have an embedded iframe. If that doesn't work go try it out at [here.](https://kdill.ca/examples/TicTacToe/v1/)

<center>
<iframe src="https://kdill.ca/examples/TicTacToe/v1/" width="100%" height="480px" scrolling="yes"> </iframe>
</center>

# Thoughts
This was a fun little exercise. There were a few things I think I would have changed if I was willing to complicate things more.

- I would have liked to use RxJS which I'm familiar with, to create a state machine for the game. It would make reacting to state changes much simpler.
- Add an AI to play against using the minimax algorithm. Maybe add a few difficulties
- Because the board can technically be n x n, it would be nice to maybe change that if the player wanted. Example:

![Example 3](https://kdill.ca/wp-content/uploads/2020/04/tictactoe3-284x300.jpg)

I may do a follow up post adding in those extra features. This is a good stopping place for now though. If you're reading this, thanks for your interest! Check out some of my other work at [kdill.ca](https://kdill.ca).

Thanks for reading!

Kev

# MIT License
>Copyright © 2020 Kevin Dill, kdill.ca
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.