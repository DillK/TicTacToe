import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicTacToeComponent } from './tic-tac-toe.component';

const routes: Routes = [{ path: '', component: TicTacToeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicTacToeRoutingModule { }
