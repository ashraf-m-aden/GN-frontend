import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiviComponent } from './add-suivi.component';

describe('AddSuiviComponent', () => {
  let component: AddSuiviComponent;
  let fixture: ComponentFixture<AddSuiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
