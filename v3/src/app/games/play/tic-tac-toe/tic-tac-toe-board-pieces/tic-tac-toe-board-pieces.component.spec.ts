import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeBoardPiecesComponent } from './tic-tac-toe-board-pieces.component';

describe('TicTacToeBoardPiecesComponent', () => {
  let component: TicTacToeBoardPiecesComponent;
  let fixture: ComponentFixture<TicTacToeBoardPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeBoardPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeBoardPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
