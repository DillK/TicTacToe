import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';

const routes: Routes = [{
  path: '',
  component: GamesComponent,
  children: [{
    path: '',
    loadChildren: () => import('./play/tic-tac-toe/tic-tac-toe.module').then(m => m.TicTacToeModule)
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
