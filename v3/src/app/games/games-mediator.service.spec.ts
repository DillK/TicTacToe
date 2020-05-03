import { TestBed } from '@angular/core/testing';

import { GamesMediatorService } from './games-mediator.service';

describe('GamesMediatorService', () => {
  let service: GamesMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
