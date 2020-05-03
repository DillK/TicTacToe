class TicTacToeCell {

  constructor() {
    this.contains = 0;
    this.winner = false;
  }
}

class TicTacToeGameState {

  constructor(gridSize) {
    this._gridSize;
    this.board = [];
    this.gameTurn = 0;
    this.isGameWon = false;
    this.isGameOutOfMoves = false;

    this._gridSize = (gridSize === null || gridSize === undefined || gridSize < 2) ? 3 : gridSize;

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
  get gridSize() {
    return this._gridSize;
  }
}

class TicTacToePlayerTurnIndicator {

  constructor(EM) {
    this._currentPlayer = 0;
    this._EM = EM;
    this._indicator = document.getElementById("player-turn-indicator");
  }

  setPlayer(player) {
    player = player != 0 && player != 1 && player != 2 ? this._currentPlayer : player;
    this._currentPlayer = player;
    this.update();
  }

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

class TicTacToeGame {
  constructor() {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    this._size;
    this._colWidth;
    this._rowHeight;

    this._state = new TicTacToeGameState();

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

  resetGame() {
    this._state = new TicTacToeGameState();
    this.drawBoard();
  }

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