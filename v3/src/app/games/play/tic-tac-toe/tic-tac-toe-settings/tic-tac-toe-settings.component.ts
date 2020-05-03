import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicTacToeMediatorService } from '../tic-tac-toe-mediator.service';
import { TicTacToeSettingsMenuComponent } from '../tic-tac-toe-settings-menu/tic-tac-toe-settings-menu.component';

@Component({
  selector: 'app-tic-tac-toe-settings',
  templateUrl: './tic-tac-toe-settings.component.html',
  styleUrls: ['./tic-tac-toe-settings.component.scss']
})
export class TicTacToeSettingsComponent {

  constructor(public mediator: TicTacToeMediatorService, public dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(TicTacToeSettingsMenuComponent);
  }
}