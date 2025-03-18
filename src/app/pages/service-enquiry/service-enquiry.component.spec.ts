import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEnquiryComponent } from './service-enquiry.component';

describe('ServiceEnquiryComponent', () => {
  let component: ServiceEnquiryComponent;
  let fixture: ComponentFixture<ServiceEnquiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceEnquiryComponent]
    });
    fixture = TestBed.createComponent(ServiceEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
