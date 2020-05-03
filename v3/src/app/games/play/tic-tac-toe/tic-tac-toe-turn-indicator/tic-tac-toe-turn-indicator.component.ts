import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { ITicTacToeGameState } from '../tic-tac-toe-model.service';

@Component({
  selector: 'app-tic-tac-toe-turn-indicator',
  templateUrl: './tic-tac-toe-turn-indicator.component.html',
  styleUrls: ['./tic-tac-toe-turn-indicator.component.scss']
})
export class TicTacToeTurnIndicatorComponent implements OnInit {
  private _EM: number;
  private _parentContainer: HTMLElement;
  private _indicatorEle: HTMLElement;
  private _p1Ele: HTMLElement;
  private _p2Ele: HTMLElement;
  p1Name: string;
  p2Name: string;

  constructor(public mediator: TicTacToeMediatorService, private changeDetector: ChangeDetectorRef) {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
  }

  ngOnInit(): void {
    // Grab the HTML Elements
    let lbls = document.getElementsByClassName('player-label');
    this._p1Ele = lbls[0] as HTMLElement;
    this._p2Ele = lbls[1] as HTMLElement;
    this._indicatorEle = document.getElementsByClassName('turn-indicator')[0] as HTMLElement;
    this._parentContainer = this._indicatorEle.parentElement;

    // Updates on resize. May require polyfill
    // @ts-ignore
    const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.updateIndicator(this.mediator.state.value);
    });
    resize.observe(this._parentContainer);

    // Updates on state change
    this.mediator.state.subscribe(state => {
      this.update(state);
    });
  }

  update(state: ITicTacToeGameState) {
    // The indicator is reliant on the player labels. This block ensures that the new labels, and their computed widths,
    // are updated BEFORE the indicator. Otherwise, the indicator player element width value would update based on the OLD label.
    // For example, this occurs specifically when modifying 'difficulty'.
    let p1 = state.userIsPlayerPosition == 1 ? state.userName : (state.difficulty != 'Solo' ? state.difficulty + ' ' : '') + state.opponentName;
    let p2 = state.userIsPlayerPosition == 2 ? state.userName : (state.difficulty != 'Solo' ? state.difficulty + ' ' : '') + state.opponentName;
    if (this.p1Name != p1 || this.p2Name != p2) {
      this.p1Name = p1;
      this.p2Name = p2;
      this.changeDetector.detectChanges();
    }

    // Update the indicator
    this.updateIndicator(state);
  }

  updateIndicator(state: ITicTacToeGameState) {
    // Parent is required for indicator positioning
    let parentWidth = this._parentContainer.offsetWidth;

    // Moves the indicator to either Player 1, Player 2, or the Neutral positions
    // Neutral
    if (state.gameTurn == 0 || state.isGameWon != 'No') {
      this._indicatorEle.style.left = "" + ((parentWidth / 2) - (this._EM * 0.75)) + "px";
      this._indicatorEle.style.width = "" + (this._EM * 1.5) + "px";
      return;
    }
    // Player 1
    else if (state.gameTurn % 2 === 0) {
      this._indicatorEle.style.left = "0px";
      this._indicatorEle.style.width = this._p1Ele.offsetWidth + "px";
      return;
    }
    // Player 2
    else if (state.gameTurn % 2 === 1) {
      let w = this._p2Ele.offsetWidth;
      this._indicatorEle.style.left = (parentWidth - w) + "px";
      this._indicatorEle.style.width = this._p2Ele.offsetWidth + "px";
      return;
    }
  }
}