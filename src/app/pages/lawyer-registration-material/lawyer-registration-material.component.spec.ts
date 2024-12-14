import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerRegistrationMaterialComponent } from './lawyer-registration-material.component';

describe('LawyerRegistrationMaterialComponent', () => {
  let component: LawyerRegistrationMaterialComponent;
  let fixture: ComponentFixture<LawyerRegistrationMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LawyerRegistrationMaterialComponent]
    });
    fixture = TestBed.createComponent(LawyerRegistrationMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
