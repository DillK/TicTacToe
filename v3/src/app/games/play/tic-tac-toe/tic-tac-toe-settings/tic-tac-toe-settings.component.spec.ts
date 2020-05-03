import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeSettingsComponent } from './tic-tac-toe-settings.component';

describe('TicTacToeSettingsComponent', () => {
  let component: TicTacToeSettingsComponent;
  let fixture: ComponentFixture<TicTacToeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
