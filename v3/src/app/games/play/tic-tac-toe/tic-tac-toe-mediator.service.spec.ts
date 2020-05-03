import { TestBed } from '@angular/core/testing';

import { TicTacToeMediatorService } from './tic-tac-toe-mediator.service';

describe('TicTacToeMediatorService', () => {
  let service: TicTacToeMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicTacToeMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
