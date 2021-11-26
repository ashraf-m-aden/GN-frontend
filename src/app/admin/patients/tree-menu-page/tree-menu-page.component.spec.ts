import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMenuPageComponent } from './tree-menu-page.component';

describe('TreeMenuPageComponent', () => {
  let component: TreeMenuPageComponent;
  let fixture: ComponentFixture<TreeMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeMenuPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
