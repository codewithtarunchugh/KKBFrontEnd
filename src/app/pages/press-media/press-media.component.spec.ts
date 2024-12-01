import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressMediaComponent } from './press-media.component';

describe('PressMediaComponent', () => {
  let component: PressMediaComponent;
  let fixture: ComponentFixture<PressMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PressMediaComponent]
    });
    fixture = TestBed.createComponent(PressMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
