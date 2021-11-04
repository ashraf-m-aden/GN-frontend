import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { MedocComponent } from "./medicaments.component";

describe("MedocComponent", () => {
  let component: MedocComponent;
  let fixture: ComponentFixture<MedocComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MedocComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
