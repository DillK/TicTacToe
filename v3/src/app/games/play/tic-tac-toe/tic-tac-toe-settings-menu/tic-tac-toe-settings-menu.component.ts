import { Component, Input } from '@angular/core';
import { AiDifficulty } from '../tic-tac-toe-model.service';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { GamesMediatorService } from 'src/app/games/games-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-settings-menu',
  templateUrl: './tic-tac-toe-settings-menu.component.html',
  styleUrls: ['./tic-tac-toe-settings-menu.component.scss']
})
export class TicTacToeSettingsMenuComponent {

  private _gridSize: number = 3;
  get gridSize(): number {
    return this._gridSize;
  }
  @Input() set gridSize(value: number) {
    if (this._gridSize != value) {
      this._gridSize = value;
      this.ticTacToeMediator.changeGridSize(value);
    }
  }

  difficulties: AiDifficulty[] = ['Solo', 'Easy', 'Medium', 'Hard', 'Impossible'];
  private _difficulty: AiDifficulty;
  get difficulty(): AiDifficulty {
    return this._difficulty;
  }
  @Input() set difficulty(value: AiDifficulty) {
    if (this._difficulty != value) {
      this._difficulty = value;
      this.ticTacToeMediator.changeDifficulty(value);
    }
  }

  constructor(public gamesMediator: GamesMediatorService, public ticTacToeMediator: TicTacToeMediatorService) {
    this._difficulty = ticTacToeMediator.state.value.difficulty;
    this._gridSize = ticTacToeMediator.state.value.gridSize;
  }
}