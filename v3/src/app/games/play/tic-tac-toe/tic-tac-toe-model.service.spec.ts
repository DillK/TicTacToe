import { TestBed } from '@angular/core/testing';

import { TicTacToeModelService } from './tic-tac-toe-model.service';

describe('TicTacToeModelService', () => {
  let service: TicTacToeModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacToeModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
