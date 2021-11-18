import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedConsultationComponent } from './saved-consultation.component';

describe('SavedConsultationComponent', () => {
  let component: SavedConsultationComponent;
  let fixture: ComponentFixture<SavedConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedConsultationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
