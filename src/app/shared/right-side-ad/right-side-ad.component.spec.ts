import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightSideAdComponent } from './right-side-ad.component';

describe('RightSideAdComponent', () => {
  let component: RightSideAdComponent;
  let fixture: ComponentFixture<RightSideAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightSideAdComponent]
    });
    fixture = TestBed.createComponent(RightSideAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
