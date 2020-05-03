import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeBoardComponent } from './tic-tac-toe-board/tic-tac-toe-board.component';
import { TicTacToeBoardGridComponent } from './tic-tac-toe-board-grid/tic-tac-toe-board-grid.component';
import { TicTacToeBoardPiecesComponent } from './tic-tac-toe-board-pieces/tic-tac-toe-board-pieces.component';
import { TicTacToeTurnIndicatorComponent } from './tic-tac-toe-turn-indicator/tic-tac-toe-turn-indicator.component';
import { TicTacToeSettingsComponent } from './tic-tac-toe-settings/tic-tac-toe-settings.component';
import { TicTacToeSettingsMenuComponent } from './tic-tac-toe-settings-menu/tic-tac-toe-settings-menu.component';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [TicTacToeComponent, TicTacToeBoardComponent, TicTacToeBoardGridComponent, TicTacToeBoardPiecesComponent, TicTacToeTurnIndicatorComponent, TicTacToeSettingsComponent, TicTacToeSettingsMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    TicTacToeRoutingModule,

    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  entryComponents: [
    TicTacToeSettingsMenuComponent
  ],
  providers: [
    MatIconRegistry
  ]
})
export class TicTacToeModule { }
