import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent implements OnInit {
  private _board: HTMLElement;

  constructor(private mediator: TicTacToeMediatorService) { }

  ngOnInit() {
    // Event listener for player input
    this._board = document.getElementsByClassName('game-input')[0] as HTMLElement;
    this._board.addEventListener("mousedown", this.boardActivationEventListener.bind(this), false);
  }

  boardActivationEventListener(e: MouseEvent) {
    let gridSize = this.mediator.state.value.gridSize;
    let colWidth = this._board.offsetWidth / gridSize;
    let rowHeight = this._board.offsetHeight / gridSize;
    // If the game is 'completed', reset the game
    if (this.mediator.state.value.isGameWon != 'No') {
      this.mediator.nextGame();
    }
    else {
      // Determine which cell was activated.
      let x = Math.floor(e.offsetX / colWidth);
      let y = Math.floor(e.offsetY / rowHeight);

      this.mediator.tryMove(x, y);
    }
  }
}