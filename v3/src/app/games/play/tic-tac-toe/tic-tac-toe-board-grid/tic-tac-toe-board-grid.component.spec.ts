import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeBoardGridComponent } from './tic-tac-toe-board-grid.component';

describe('TicTacToeBoardGridComponent', () => {
  let component: TicTacToeBoardGridComponent;
  let fixture: ComponentFixture<TicTacToeBoardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeBoardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeBoardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
