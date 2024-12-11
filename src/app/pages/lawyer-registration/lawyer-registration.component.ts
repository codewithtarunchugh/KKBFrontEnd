import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.css'],
})
export class LawyerRegistrationComponent implements OnInit {
  userForm!: FormGroup;
  years: number[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let year = 1960; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.userForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        mobileNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        profileUpload: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        practiceYear: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        language: ['', Validators.required],
        specialization: ['', Validators.required],
        address: ['', Validators.required],
        about: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        enrollmentNumber: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
        ],
        consultancyFee: ['', Validators.required],
        practiceAreas: ['', Validators.required],
        courts: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatcher('password', 'confirmPassword'), // Custom validator for matching passwords
      }
    );
  }

  // Custom password matching validator
  passwordMatcher(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
      const pass = group.controls[password];
      const confirmPass = group.controls[confirmPassword];
      if (pass.value !== confirmPass.value) {
        confirmPass.setErrors({ mismatch: true });
      } else {
        confirmPass.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
    } else {
      console.log('Form Invalid');
    }
  }
}
