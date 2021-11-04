import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdonnancesComponent } from './all-ordonnances.component';

describe('AllOrdonnancesComponent', () => {
  let component: AllOrdonnancesComponent;
  let fixture: ComponentFixture<AllOrdonnancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrdonnancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdonnancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
