import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedSuiviComponent } from './saved-suivi.component';

describe('SavedSuiviComponent', () => {
  let component: SavedSuiviComponent;
  let fixture: ComponentFixture<SavedSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
