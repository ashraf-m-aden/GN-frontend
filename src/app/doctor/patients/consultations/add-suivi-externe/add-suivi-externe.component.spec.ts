import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiviExterneComponent } from './add-suivi-externe.component';

describe('AddSuiviExterneComponent', () => {
  let component: AddSuiviExterneComponent;
  let fixture: ComponentFixture<AddSuiviExterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuiviExterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuiviExterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
