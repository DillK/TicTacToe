/**
 * Struct to hold the relevant values for TicTacToe
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

/**
 * Class used to represent the TicTacToe game state.
 */
class TicTacToeGameState {
  /**
   * @param {number} _gridSize - Private value used for tracking the size of the grid being used.
   */
  _gridSize;

  /**
   * @param {TicTacToeCell[][]} board - A 2 dimensional array of TicTacToe Cells, representing the gameboard.
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

  /**
   * @param {number} gridSize - Read Only value for the size of the grid being used for the TicTacToe game.
   */
  get gridSize() {
    return this._gridSize;
  }
}

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

/**
 * Class to create a new TicTacToe Game
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
   * @param {TicTacToeGameState} _state - Private variable to hold the TicTacToe game state.
   */
  _state = new TicTacToeGameState();

  // HTML Elements
  /**
   * @param {HTMLElement} _canvas - Private variable to hold the HTML Canvas for our TicTacToe game.
   */
  _canvas;

  /**
   * @param {HTMLElement} _canvas - Private variable to hold the Canvas Context for our TicTacToe game.
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

  /**
   * Represent a TicTacToe Game
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

  /**
   * Resets the TicTacToe Game
   */
  resetGame() {
    this._state = new TicTacToeGameState();
    this.drawBoard();
  }

  /**
   * Checks if the player move input is valid.
   * @param {number} x - The X Position of the TicTacToe Cell.
   * @param {number} y - The Y Position of the TicTacToe Cell.
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
}