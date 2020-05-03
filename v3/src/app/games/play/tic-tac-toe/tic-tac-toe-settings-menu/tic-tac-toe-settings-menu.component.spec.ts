import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeSettingsMenuComponent } from './tic-tac-toe-settings-menu.component';

describe('TicTacToeSettingsMenuComponent', () => {
  let component: TicTacToeSettingsMenuComponent;
  let fixture: ComponentFixture<TicTacToeSettingsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeSettingsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeSettingsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
