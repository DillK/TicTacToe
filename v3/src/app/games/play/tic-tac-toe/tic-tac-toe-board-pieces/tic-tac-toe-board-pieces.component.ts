import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { GamesMediatorService } from 'src/app/games/games-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board-pieces',
  templateUrl: './tic-tac-toe-board-pieces.component.html',
  styleUrls: ['./tic-tac-toe-board-pieces.component.scss']
})
export class TicTacToeBoardPiecesComponent implements OnInit {

  // Measurement variables
  private _EM: number;
  private _colWidth: number;
  private _rowHeight: number;
  private _currentGridSize: number;

  // HTML Elements
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _historyLength: number = 0;

  // Animation variables
  private _animationDuration = 240;

  constructor(private gamesMediator: GamesMediatorService, private mediator: TicTacToeMediatorService) {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    this._currentGridSize = mediator.state.value.gridSize;
  }

  ngOnInit(): void {
    // Grab the HTML Elements
    this._canvas = document.getElementsByClassName('game-pieces')[0] as HTMLCanvasElement;

    // Adjust context
    this._context = this._canvas.getContext('2d');
    this._context.imageSmoothingEnabled = true;
    this._context.imageSmoothingQuality = 'high';

    // Updates on resize. May require polyfill
    // @ts-ignore
    const resize = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      this.resize();
    });
    resize.observe(this._canvas);

    // Updates on state change
    this.mediator.state.subscribe(state => {
      // Case 0 - Grid Resize
      if (this._currentGridSize != state.gridSize) {
        this._currentGridSize = state.gridSize;
        this.resize();
      }
      // Case 1 - New Game / Clear Board
      else if (state.gameTurn == 0) {
        this._historyLength = 0;
        this.clear();
      }

      // Case 2 & 3 - Game Has Ended
      if (state.isGameWon != 'No') {
        this.redraw();
      }

      // Case 4 - A new move has been played
      if (this._historyLength != this.mediator.moveHistory.length) {
        this._historyLength = this.mediator.moveHistory.length;
        if (this._historyLength != 0) {
          let cell = this.mediator.moveHistory[this.mediator.moveHistory.length - 1];
          this.animate(cell.x, cell.y, 0, this.gamesMediator.frequency / this._animationDuration, this.gamesMediator.frequency);
        }
      }
    });
  }

  resize() {
    // Adjusts the internal resolution of the canvas
    this._context.canvas.width = this._context.canvas.offsetWidth;
    this._context.canvas.height = this._context.canvas.offsetHeight;

    let w = this._context.canvas.offsetWidth;
    let h = this._context.canvas.offsetHeight;

    this._colWidth = w / this._currentGridSize;
    this._rowHeight = h / this._currentGridSize;

    this.redraw();
  }

  private animate(x: number, y: number, percent: number, changeInPercent: number, frequency: number) {
    // Animations Enabled
    percent = this.gamesMediator.isAnimationEnabled ? percent : 1;

    // Prevents going over '100%' and over drawing our piece
    percent = percent > 1 ? 1 : percent;

    let cell = this.mediator.state.value.board[x][y];

    // If the cell is empty, or invalidated since last draw - don't draw
    if (cell == null || cell.contains == 0) return;

    // Sets up context for drawing
    this._context.lineWidth = this._EM;
    this._context.lineCap = 'round';
    this._context.strokeStyle = this.mediator.strokePrimaryColor;
    this._context.beginPath();

    // Draw X
    if (cell.contains == 1) {
      // These percent ensure the lines alternate
      let percent1 = percent <= 0.5 ? percent * 2 : 1;
      let percent2 = percent >= 0.5 ? (percent - 0.5) * 2 : 0;

      // Positioning of the lines
      let startX = (x * this._colWidth) + this._EM;
      let startY = (y * this._rowHeight) + this._EM;
      let endX = ((x + 1) * this._colWidth) - this._EM;
      let endY = ((y + 1) * this._rowHeight) - this._EM;
      let xDiff = (endX - startX) * percent1;
      let yDiff = (endY - startY) * percent1;
      let xDiff2 = (endX - startX) * percent2;
      let yDiff2 = (endY - startY) * percent2;

      // Draw first line
      if (percent1 > 0) {
        this._context.moveTo(startX, startY);
        this._context.lineTo(startX + xDiff, startY + yDiff);
      }
      // Draw second line
      if (percent2 > 0) {
        this._context.moveTo(endX, startY);
        this._context.lineTo(endX - xDiff2, startY + yDiff2);
      }
    }
    // Draw O
    else if (cell.contains == 2) {
      // Simply draw an arc
      let minX = x * this._colWidth;
      let minY = y * this._rowHeight;
      let maxX = (x + 1) * this._colWidth;
      let maxY = (y + 1) * this._rowHeight;
      let radius = (maxX - minX - (this._EM * 2)) / 2;
      let centerX = maxX - ((maxX - minX) / 2);
      let centerY = maxY - ((maxY - minY) / 2);
      let startAngle = (3 * Math.PI) / 2;
      let endAngle = (((3 * Math.PI) / 2) + (2 * Math.PI) * percent);
      this._context.arc(centerX, centerY, radius, startAngle, endAngle);
    }

    // Set Color and Stroke Path
    if (cell.winner === true) {
      this._context.strokeStyle = this.mediator.strokeWinColor;
      this._context.stroke();
      this._context.strokeStyle = this.mediator.strokePrimaryColor;
    }
    else if (this.mediator.state.value.isGameWon == 'Tied') {
      this._context.strokeStyle = this.mediator.strokeTieColor;
      this._context.stroke();
      this._context.strokeStyle = this.mediator.strokePrimaryColor;
    }
    else {
      this._context.stroke();
    }

    if (percent < 1) {
      setTimeout(() => {
        this.animate(x, y, percent + changeInPercent, this.gamesMediator.frequency / this._animationDuration, this.gamesMediator.frequency);
      }, frequency);
    }
  }

  clear() {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  redraw() {
    // Clears the pieces canvas for redraw
    this.clear();

    // Configs animate to instantly draw each piece
    for (let i = 0; i < this.mediator.moveHistory.length; i++) {
      let cell = this.mediator.moveHistory[i];
      this.animate(cell.x, cell.y, 1, 0, 0);
    }
  }
}