import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-lawyer-registration',
  templateUrl: './lawyer-registration.component.html',
  styleUrls: ['./lawyer-registration.component.css'],
})
export class LawyerRegistrationComponent implements OnInit {
  userForm!: FormGroup;
  years: number[] = [];

  specialList: string[] = [
    'Advance Contracts',
    'Animal Protection Laws',
    'Alimony',
    'Anti-Corruption',
    'Arbitration',
    'Armed Forces Tribunal',
    'Appeals',
    'Aviation',
    'Bail & Bonds',
    'Banking',
    'Bankruptcy and Insolvency',
    'Business Laws',
    'Cheque Bounce',
    'Child Custody',
    'Commodities & Derivatives',
    'Civil',
    'Compliances',
    'Constitutional Law',
    'Consumer Protection',
    'Contracts',
    'Corporate Law',
    'Criminal Law',
    'Custom & Excise',
    'Cyber Laws',
    'Debt Recovery Tribunal',
    'Defamation',
    'Divorce',
    'Domestic Violence',
    'Environmental Laws',
    'Family Matters',
    'GST',
    'Human Rights',
    'Insurance',
    'Immigration',
    'Intellectual Property Rights',
    'International Laws',
    'International Trade Law',
    'Juvenile Justice',
    'Labour',
    'Marine Laws',
    'Media',
    'Medical Negligence',
    'Mergers & Acquisition',
    'Motor Accident',
    'Muslim Law',
    'Property Laws',
    'Public Interest Litigation',
    'Revenue',
  ];
  courtList: string[] = [
    'Supreme Court',
    'High Courts',
    'District Courts',
    'Sessions Courts',
    'Family Courts',
    'Lok Adalats',
    'Civil Courts',
    'Consumer Courts',
    'Magistrate Courts',
    'Juvenile Courts',
    'NCLT',
    'NGT',
  ];
  consultancyFee: string[] = ['1000', '2000', '3000', '4000', '5000'];
  languageList: string[] = [
    'Hindi',
    'English',
    'Marathi',
    'Punjabi',
    'Tamil',
    'Telugu',
    'Bangali',
    'Kannada',
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    for (let year = 1960; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.userForm = this.fb.group(
      {
        title: ['', [Validators.required]],
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
        language: this.fb.array([], Validators.required),
        specialization: this.fb.array([], Validators.required),
        address: ['', Validators.required],
        about: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        enrollmentNumber: [
          '',
          [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
        ],
        consultancyFee: ['', Validators.required],
        practiceAreas: ['', Validators.required],
        courts: this.fb.array([], Validators.required),
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordMatcher('password', 'confirmPassword'), // Custom validator for matching passwords
      }
    );
    // this.initializeCourts();
  }
  get specialization(): FormArray {
    return this.userForm.get('specialization') as FormArray;
  }
  get language(): FormArray {
    return this.userForm.get('language') as FormArray;
  }
  get courts(): FormArray {
    return this.userForm.get('courts') as FormArray;
  }
  onSpecializationChange(event: any, specializationName: string) {
    const specializationArray = this.specialization;

    // If checked, add the language name to the FormArray
    if (event.target.checked) {
      specializationArray.push(this.fb.control(specializationName));
    } else {
      // If unchecked, remove the language name from the FormArray
      const index = specializationArray.controls.findIndex(
        (control) => control.value === specializationName
      );
      if (index !== -1) {
        specializationArray.removeAt(index);
      }
    }
  }

  // Check if the court is selected
  isSpecializationSelected(specializationName: string): boolean {
    return this.specialization.controls.some(
      (control) => control.value === specializationName
    );
  }
  // Handle checkbox changes
  onLanguageChange(event: any, languageName: string) {
    const languageArray = this.language;

    // If checked, add the language name to the FormArray
    if (event.target.checked) {
      languageArray.push(this.fb.control(languageName));
    } else {
      // If unchecked, remove the language name from the FormArray
      const index = languageArray.controls.findIndex(
        (control) => control.value === languageName
      );
      if (index !== -1) {
        languageArray.removeAt(index);
      }
    }
  }

  // Check if the court is selected
  isLanguageSelected(languageName: string): boolean {
    return this.language.controls.some(
      (control) => control.value === languageName
    );
  }

  // Handle checkbox changes
  onCourtChange(event: any, courtName: string) {
    const courtArray = this.courts;

    // If checked, add the court name to the FormArray
    if (event.target.checked) {
      courtArray.push(this.fb.control(courtName));
    } else {
      // If unchecked, remove the court name from the FormArray
      const index = courtArray.controls.findIndex(
        (control) => control.value === courtName
      );
      if (index !== -1) {
        courtArray.removeAt(index);
      }
    }
  }

  // Check if the court is selected
  isCourtSelected(courtName: string): boolean {
    return this.courts.controls.some((control) => control.value === courtName);
  }

  // Method to initialize the formArray for courts
  initializeCourts() {
    this.courtList.forEach(() => {
      this.courts.push(this.fb.control(false)); // Initialize each court as unchecked (false)
    });
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
  onReset() {
    this.userForm.reset();
  }
}
