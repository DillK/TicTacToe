import { Injectable } from '@angular/core';

export type AiDifficulty = 'Solo' | 'Easy' | 'Medium' | 'Hard' | 'Impossible';

export interface ITicTacToeCell {
  contains: 0 | 1 | 2;  // 0 Is empty, 1 is X's, 2 is O's
  winner: boolean;      // Is set if cell is part of win condition
  x: number;            // X position on Board
  y: number;            // Y position on Board
}

export interface ITicTacToeGameState {
  userIsPlayerPosition: 1 | 2;
  userName: string;
  opponentName: string;
  difficulty: AiDifficulty;
  gridSize: number;
  board: ITicTacToeCell[][];
  gameTurn: number;
  isGameWon: 'No' | 'Yes' | 'Tied';
}

@Injectable({
  providedIn: 'root'
})
export class TicTacToeModelService implements ITicTacToeGameState {

  static readonly MINIMUM_GRID_SIZE = 3;

  userIsPlayerPosition: 1 | 2;
  userName: string;
  opponentName: string;
  difficulty: AiDifficulty;

  private _gridSize: number;
  set gridSize(val: number) {
    if (val == null) {
      console.warn(`Grid size is unset. Returning default grid size: ${TicTacToeModelService.MINIMUM_GRID_SIZE}.`);
      val = TicTacToeModelService.MINIMUM_GRID_SIZE;
    }
    else if (val < TicTacToeModelService.MINIMUM_GRID_SIZE) {
      console.warn(`Grid size cannot be less than ${TicTacToeModelService.MINIMUM_GRID_SIZE}. Returning default grid size: ${TicTacToeModelService.MINIMUM_GRID_SIZE}.`);
      val = TicTacToeModelService.MINIMUM_GRID_SIZE;
    }
    this._gridSize = val;
    this.restart();
  }
  get gridSize(): number {
    return this._gridSize;
  }

  board: ITicTacToeCell[][];
  gameTurn: number;
  isGameWon: 'No' | 'Yes' | 'Tied';

  constructor() {
    this.userIsPlayerPosition = 1;
    this.userName = 'Player';
    this.opponentName = 'Opponent';
    this.difficulty = 'Easy';
    this.gridSize = TicTacToeModelService.MINIMUM_GRID_SIZE;
    // Restart is called when we assign grid size, constructing the rest of the default values
  }

  /**
   * Restarts the game.
   */
  restart(): ITicTacToeGameState {
    this.gameTurn = 0;
    this.isGameWon = 'No';

    // Board setup
    this.board = [];
    for (let x = 0; x < this.gridSize; x++) {
      this.board[x] = [];
      for (let y = 0; y < this.gridSize; y++) {
        this.board[x][y] = {
          contains: 0,
          winner: false,
          x: x,
          y: y
        };
      }
    }
    return this;
  }

  /**
   * Proceeds to the next game, alternating user player position.
   */
  nextGame(): ITicTacToeGameState {
    this.userIsPlayerPosition = this.userIsPlayerPosition == 1 ? 2 : 1;
    return this.restart();
  }

  /**
   * Tries a move. If valid win conditionals are checked and board cells updated.
   * @param {number} x - The X Position of the TicTacToe Cell.
   * @param {number} y - The Y Position of the TicTacToe Cell.
   */
  tryMove(x: number, y: number): boolean {
    //let state = this;
    if (this.board[x][y].contains === 0) {
      if ((this.gameTurn % 2) === 0) {
        this.board[x][y].contains = 1;
      } else {
        this.board[x][y].contains = 2;
      }

      // Check row win conditions
      let row = this.board.length - 1;
      let col = y;
      let rowWin = TicTacToeModelService.checkRowWinCondition(this, this.board[x][y], row, col);

      // Check column win condition
      row = x;
      col = this.board[x].length - 1;
      let colWin = TicTacToeModelService.checkColumnWinCondition(this, this.board[x][y], row, col);

      // Check diagonal win condition
      row = this.board.length - 1;
      col = this.board[x].length - 1;
      let diagWin = TicTacToeModelService.checkDiagonalWinCondition(this, this.board[x][y], row, col);

      // Check reverse diagonal win condition
      row = 0;
      col = this.board[x].length - 1;
      let maxRow = this.board.length - 1;
      let reverseDiagWin = TicTacToeModelService.checkReverseDiagonalWinCondition(this, this.board[x][y], row, col, maxRow);

      this.gameTurn++;

      // Confirm if the game has been won
      if (rowWin === true || colWin === true || diagWin === true || reverseDiagWin === true) {
        this.isGameWon = 'Yes';
      }
      // Has game run out of moves?
      else if (this.gameTurn >= Math.pow(this.gridSize, 2)) {
        this.isGameWon = 'Tied';
      }

      return true;
    }
    else return false;
  }

  // Win Conditionals
  /**
   * Recursive function to determine if the reverse diagonal win condition has been met.
   * @param {ITicTacToeGameState} state - the current state to be tested.
   * @param {ITicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   * @param {number} maxRow - The end condition for which row will be tested upto.
   */
  static checkReverseDiagonalWinCondition(state: ITicTacToeGameState, cell: ITicTacToeCell, row: number, col: number, maxRow: number): boolean {
    let b = state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= maxRow && col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkReverseDiagonalWinCondition(state, cell, (row + 1), (col - 1), maxRow);
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
   * @param {ITicTacToeGameState} state - the current state to be tested.
   * @param {ITicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   */
  static checkDiagonalWinCondition(state: ITicTacToeGameState, cell: ITicTacToeCell, row: number, col: number): boolean {
    let b = state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= 0 && col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkDiagonalWinCondition(state, cell, (row - 1), (col - 1));
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
   * @param {ITicTacToeGameState} state - the current state to be tested.
   * @param {ITicTacToeCell} cell - the current cell being tested.
   * @param {number} row - the current row being tested.
   * @param {number} col - the current column being tested.
   */
  static checkColumnWinCondition(state: ITicTacToeGameState, cell: ITicTacToeCell, row: number, col: number): boolean {
    let b = state.board;
    if (b[row][col].contains === cell.contains) {
      if (col <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkColumnWinCondition(state, cell, row, (col - 1));
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
  * @param {ITicTacToeCell} cell - the current cell being tested.
  * @param {number} row - the current row being tested.
  * @param {number} col - the current column being tested.
  */
  static checkRowWinCondition(state: ITicTacToeGameState, cell: ITicTacToeCell, row: number, col: number): boolean {
    let b = state.board;
    if (b[row][col].contains === cell.contains) {
      if (row <= 0) {
        b[row][col].winner = true;
        return true;
      }
      else {
        let winner = this.checkRowWinCondition(state, cell, (row - 1), col);
        if (winner === true) {
          b[row][col].winner = true;
        }
        return winner;
      }
    } else {
      return false;
    }
  }
}