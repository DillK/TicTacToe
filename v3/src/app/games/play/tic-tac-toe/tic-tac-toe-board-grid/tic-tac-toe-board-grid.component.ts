import { Component, OnInit } from '@angular/core';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';

@Component({
  selector: 'app-tic-tac-toe-board-grid',
  templateUrl: './tic-tac-toe-board-grid.component.html',
  styleUrls: ['./tic-tac-toe-board-grid.component.scss']
})
export class TicTacToeBoardGridComponent implements OnInit {
  private _EM: number;
  private _colWidth: number;
  private _rowHeight: number;
  private _currentGridSize: number;
  private _board: HTMLElement;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor(private mediator: TicTacToeMediatorService) {
    this._EM = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0]);
    this._currentGridSize = 1;
  }

  ngOnInit(): void {
    // Grab the HTML Elements
    this._canvas = document.getElementsByClassName('game-grid')[0] as HTMLCanvasElement;
    this._board = document.getElementsByClassName('game-board')[0] as HTMLElement;
    this._context = this._canvas.getContext('2d');

    // Updates on resize. May require polyfill
    // @ts-ignore
    const resiveObserver = new ResizeObserver(observer => {
      this.resize();
    });
    resiveObserver.observe(this._board);

    // Updates on state change
    this.mediator.state.subscribe(state => {
      if (this._currentGridSize != state.gridSize) {
        this._currentGridSize = state.gridSize;
        this.resize();
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

    this.draw();
  }

  draw() {
    let w = this._context.canvas.offsetWidth;
    let h = this._context.canvas.offsetHeight;

    // Clear canvas for redrawing, and add canvas styling
    // console.log(`Grid Fill Color ${getComputedStyle(this._board).backgroundColor}`);
    this._context.fillStyle = getComputedStyle(this._board).backgroundColor;
    this._context.fillRect(0, 0, w, h);
    this._context.lineWidth = this._EM / 4;

    // Invert stroke color
    let px = this._context.getImageData(0, 0, 1, 1);
    let r = px.data[0], g = px.data[1], b = px.data[2];
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    let strokeColor = `rgb(${r}, ${g}, ${b})`;
    this._context.strokeStyle = strokeColor;

    // Draw column grid lines
    let numberOfCol = w / this._colWidth;
    let x = 0;
    for (let i = 0; i < numberOfCol - 1; i++) {
      x += this._colWidth;
      this._context.beginPath();
      this._context.moveTo(x, 0);
      this._context.lineTo(x, h);
      this._context.stroke();
    }

    // Draw row grid lines
    let numberOfRow = h / this._rowHeight;
    let y = 0;
    for (let i = 0; i < numberOfRow - 1; i++) {
      y += this._rowHeight;
      this._context.beginPath();
      this._context.moveTo(0, y);
      this._context.lineTo(w, y);
      this._context.stroke();
    }
  }
}