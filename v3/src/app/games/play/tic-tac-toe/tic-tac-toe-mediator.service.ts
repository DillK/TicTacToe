import { Injectable } from '@angular/core';
import { ITicTacToeGameState, TicTacToeModelService, AiDifficulty, ITicTacToeCell } from './tic-tac-toe-model.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeMediatorService {
  strokePrimaryColor: string = "white";
  strokeWinColor: string = 'green';
  strokeTieColor: string = 'red';

  // Tracks move history. This will be used to track animations and 'replay' games
  moveHistory: ITicTacToeCell[];

  // Observable acting as our state machine
  state: BehaviorSubject<ITicTacToeGameState>;

  constructor(private model: TicTacToeModelService) {
    this.state = new BehaviorSubject(model);

    // Clears move history
    this.state.subscribe(state => {
      if (state.gameTurn == 0) {
        this.moveHistory = [];
      }
    })
  }

  /**
   * Tries a move. If successful the model will process the action and 'state' and 'moveHistory' will be updated.
   * @param {number} x - The X Position of the TicTacToe Cell.
   * @param {number} y - The Y Position of the TicTacToe Cell.
   */
  tryMove(x: number, y: number) {
    let b = this.model.tryMove(x, y);
    if (b) this.moveHistory.push(this.model.board[x][y]);
    this.state.next(this.model);
  }

  /**
   * Proceeds to the next game, alternating user player position. 'State' will be updated.
   */
  nextGame() {
    this.state.next(this.model.nextGame());
  }

  /**
   * Changes the model's AI difficulty. 'State' will be updated.
   * @param {AiDifficulty} difficulty - The AI difficulty to be set.
   */
  changeDifficulty(difficulty: AiDifficulty) {
    if (difficulty != this.state.value.difficulty) {
      this.model.difficulty = difficulty;
      this.state.next(this.model);
    }
  }

  /**
   * Changes the model's grid size. 'State' will be updated. Game will be reset.
   * @param {number} size - The size of grid to change to.
   */
  changeGridSize(size: number) {
    if (size != this.model.gridSize) {
      this.model.gridSize = size;
      this.state.next(this.model);
    }
  }
}
