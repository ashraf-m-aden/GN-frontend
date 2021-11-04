import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnalysesComponent } from './all-analyses.component';

describe('AllAnalysesComponent', () => {
  let component: AllAnalysesComponent;
  let fixture: ComponentFixture<AllAnalysesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAnalysesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
