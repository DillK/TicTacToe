import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeTurnIndicatorComponent } from './tic-tac-toe-turn-indicator.component';

describe('TicTacToeTurnIndicatorComponent', () => {
  let component: TicTacToeTurnIndicatorComponent;
  let fixture: ComponentFixture<TicTacToeTurnIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeTurnIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeTurnIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
