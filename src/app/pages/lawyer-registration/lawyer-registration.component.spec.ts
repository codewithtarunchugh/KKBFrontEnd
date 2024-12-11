import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerRegistrationComponent } from './lawyer-registration.component';

describe('LawyerRegistrationComponent', () => {
  let component: LawyerRegistrationComponent;
  let fixture: ComponentFixture<LawyerRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawyerRegistrationComponent]
    });
    fixture = TestBed.createComponent(LawyerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
