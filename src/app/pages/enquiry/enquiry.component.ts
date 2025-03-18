import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEnquiryRequest } from 'src/app/core/Models/interfaces/content';
import { EnquiryService } from 'src/app/core/services/enquiry/enquiry.service';
import { MiscService } from 'src/app/core/services/Misc/misc.service';

interface City {
  name: string;
  icon: string;
}

interface Cities {
  [key: string]: City[]; // This allows any string as a key
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css'],
})
export class EnquiryComponent implements OnInit, OnDestroy {
   enquiryRequest:IEnquiryRequest={
      EnquiryType: '',
    CaseType: '',
    CaseCategory: '',
    State: '',
    City: '',
    Pincode: '',
    Howfound: '',
    Title : '',
    FirstName: '',
    LastName: '',
    Email: '',
    Phone: '',
    Remarks : '',
    Subject: '',
    Question: '',
    };
  modalSubscription: Subscription = new Subscription();
  isCallModalOpen = true; // Control the modal visibility
  caseTypes = [
    {
      id: 1,
      name: 'Legal Notices',
      icon: 'fas fa-envelope',
      subGroups: [
        { name: 'Drafting a Legal Notice', icon: 'fas fa-file-alt' },
        {
          name: 'Legal Notice for Recovery of dues',
          icon: 'fas fa-file-invoice',
        },
        { name: 'Cheque Bounce Notice', icon: 'fas fa-money-check-alt' },
        {
          name: 'Legal Notice Under Consumer Protection Act',
          icon: 'fas fa-gavel',
        },
      ],
    },
    {
      id: 2,
      name: 'Property Lawyer',
      icon: 'fas fa-home',
      subGroups: [
        { name: 'Land Acquisition Matters', icon: 'fas fa-map-signs' },
        { name: 'Property Registration', icon: 'fas fa-registered' },
        { name: 'Property Verification', icon: 'fas fa-search' },
        { name: 'Estate Planning', icon: 'fas fa-calendar-alt' },
        { name: 'Property Succession', icon: 'fas fa-users-cog' },
        { name: 'Will Drafting and Registration', icon: 'fas fa-scroll' },
        { name: 'Landlord / Tenant Disputes', icon: 'fas fa-user-friends' },
        { name: 'RERA Consultation', icon: 'fas fa-building' },
        { name: 'Relinquishment Deed', icon: 'fas fa-file-signature' },
        { name: 'Power of Attorney', icon: 'fas fa-user-tie' },
        { name: 'Gift Deed', icon: 'fas fa-gift' },
        { name: 'Rental Tenant Notice', icon: 'fas fa-file-alt' },
      ],
    },
    {
      id: 3,
      name: 'Family Lawyer',
      icon: 'fas fa-users',
      subGroups: [
        {
          name: 'Divorce & Matrimonial Consultation',
          icon: 'fas fa-heart-broken',
        },
        { name: 'Maintenance and Alimony', icon: 'fas fa-money-bill-wave' },
        { name: 'Child Custody and Guardianship', icon: 'fas fa-child' },
        { name: 'Muslim Law', icon: 'fas fa-mosque' },
        { name: 'Violence Against Women', icon: 'fas fa-fist-raised' },
        { name: 'Legal Heir', icon: 'fas fa-user-shield' },
      ],
    },
    {
      id: 4,
      name: 'Civil Lawyer',
      icon: 'fas fa-gavel',
      subGroups: [
        { name: 'Defamation Cases', icon: 'fas fa-bullhorn' },
        { name: 'Legal Notices', icon: 'fas fa-envelope' },
        { name: 'Cheque Bounce Cases', icon: 'fas fa-money-check-alt' },
        { name: 'Money Recovery Issues', icon: 'fas fa-dollar-sign' },
        { name: 'Mediation / Arbitration', icon: 'fas fa-balance-scale' },
        { name: 'Write Petition / PIL', icon: 'fas fa-file-alt' },
        {
          name: 'Loan Recovery / Bank Account Freeze / Unfreeze',
          icon: 'fas fa-lock',
        },
        { name: 'E-Court Filing Procedures', icon: 'fas fa-laptop' },
        { name: 'National Green Tribunal Cases', icon: 'fas fa-leaf' },
        { name: 'Debt Recovery Tribunal', icon: 'fas fa-file-invoice-dollar' },
        {
          name: 'Motor Accident Claims / Traffic Challan',
          icon: 'fas fa-car-crash',
        },
        { name: 'Cyber Crime / Complaint', icon: 'fas fa-user-secret' },
        {
          name: 'MSME Samadhan / MSME Recovery & Related Matters',
          icon: 'fas fa-industry',
        },
        { name: 'Insolvency & Bankruptcy', icon: 'fas fa-file-contract' },
        { name: 'Rent Control Cases', icon: 'fas fa-home' },
        { name: 'Legal Retainer', icon: 'fas fa-user-tie' },
      ],
    },
    {
      id: 5,
      name: 'Criminal Lawyer',
      icon: 'fas fa-user-secret',
      subGroups: [
        { name: 'Criminal Bail Application', icon: 'fas fa-gavel' },
        {
          name: 'NDPS (Narcotic Drugs and Psychotropic Substances Act)',
          icon: 'fas fa-syringe',
        },
        { name: 'Criminal Trial Court Matters', icon: 'fas fa-briefcase' },
        { name: 'File a Criminal Complaint', icon: 'fas fa-file-alt' },
      ],
    },
    {
      id: 6,
      name: 'Consumer Lawyer',
      icon: 'fas fa-shopping-cart',
      subGroups: [
        { name: 'File a Consumer Case', icon: 'fas fa-file-alt' },
        { name: 'Consumer Law Consultation', icon: 'fas fa-comments' },
      ],
    },
    {
      id: 7,
      name: 'Company Law Matters',
      icon: 'fas fa-building',
      subGroups: [
        { name: 'Legal Retainer', icon: 'fas fa-user-tie' },
        { name: 'Political Party Registration', icon: 'fas fa-flag' },
        { name: 'Setting up of a Business', icon: 'fas fa-cogs' },
        { name: 'ESOP / Fundraising for Business', icon: 'fas fa-dollar-sign' },
        { name: 'Business Debt Restructuring', icon: 'fas fa-sync-alt' },
        { name: 'Drug & Cosmetic License', icon: 'fas fa-pills' },
        { name: 'Legal Metrology', icon: 'fas fa-balance-scale' },
        { name: 'POSH Lawyer', icon: 'fas fa-user-shield' },
        { name: 'Business Contracts & Documents', icon: 'fas fa-file-alt' },
        { name: 'Business Due Diligence', icon: 'fas fa-search' },
        { name: 'Barcode License', icon: 'fas fa-barcode' },
        { name: 'BIS Registration', icon: 'fas fa-check-circle' },
        { name: 'Other Licenses & Registration', icon: 'fas fa-file-alt' },
      ],
    },
    {
      id: 8,
      name: 'Constitutional Lawyer',
      icon: 'fas fa-balance-scale',
      subGroups: [
        { name: 'Write Petition / PIL', icon: 'fas fa-file-alt' },
        { name: 'Constitutional Bail Application', icon: 'fas fa-gavel' },
      ],
    },
    {
      id: 9,
      name: 'Legal Documentation',
      icon: 'fas fa-file-contract',
      subGroups: [
        {
          name: 'Business Contracts - NDA / SLA / Franchise Agreement Etc',
          icon: 'fas fa-file-alt',
        },
        { name: 'Employment Contracts', icon: 'fas fa-file-alt' },
        {
          name: 'Real Estate Agreements - Rent / Lease / Sale Deed Etc',
          icon: 'fas fa-home',
        },
        { name: 'Other Contracts & Agreements', icon: 'fas fa-file-alt' },
      ],
    },
    {
      id: 10,
      name: 'Labour Lawyer',
      icon: 'fas fa-hard-hat',
      subGroups: [
        {
          name: 'Employment Issues - Employee / Employer Disputes',
          icon: 'fas fa-user-friends',
        },
        {
          name: 'Sexual Harassment at Workplace - POSH Cases',
          icon: 'fas fa-fist-raised',
        },
        {
          name: 'CLRA - Contract Labour Regulation and Abolition Act',
          icon: 'fas fa-file-alt',
        },
      ],
    },
    {
      id: 11,
      name: 'IP Lawyer',
      icon: 'fas fa-lightbulb',
      subGroups: [
        { name: 'Trademark', icon: 'fas fa-tag' },
        { name: 'Copyright', icon: 'fas fa-book' },
        { name: 'Patent', icon: 'fas fa-patent' },
        { name: 'IP Infringement', icon: 'fas fa-exclamation-triangle' },
        { name: 'IP Transfer', icon: 'fas fa-exchange-alt' },
        { name: 'Hearing', icon: 'fas fa-gavel' },
      ],
    },
    {
      id: 12,
      name: 'Others',
      icon: 'fas fa-ellipsis-h',
      subGroups: [{ name: 'Others', icon: 'fas fa-file-alt' }],
    },
  ];

  // Sample data for Indian states and cities
  advertisements = [
    { name: 'Youtube', image: 'youtube.png' },
    { name: 'Facebook', image: 'facebook.png' },
    { name: 'Instagram', image: 'instagram.png' },
    { name: 'WhatsApp', image: 'whatsapp.png' },
    { name: 'X', image: 'x.png' },
    { name: 'LinkedIn', image: 'linkedin.png' },
    { name: 'Newspaper', image: 'news.png' },
    { name: 'Other', image: 'others.png' },
  ];

  // Sample data for Indian states and cities
  states = [
    { name: 'Maharashtra', icon: 'fas fa-map-marked-alt' },
    { name: 'Karnataka', icon: 'fas fa-map-marked-alt' },
    { name: 'Tamil Nadu', icon: 'fas fa-map-marked-alt' },
    { name: 'Delhi', icon: 'fas fa-map-marked-alt' },
    { name: 'West Bengal', icon: 'fas fa-map-marked-alt' },
    { name: 'Punjab', icon: 'fas fa-map-marked-alt' },
    { name: 'Haryana', icon: 'fas fa-map-marked-alt' },
    { name: 'Rajasthan', icon: 'fas fa-map-marked-alt' },
    { name: 'Uttar Pradesh', icon: 'fas fa-map-marked-alt' },
    { name: 'Madhya Pradesh', icon: 'fas fa-map-marked-alt' },
  ];

  cities: Cities = {
    Maharashtra: [
      { name: 'Mumbai', icon: 'fas fa-city' },
      { name: 'Pune', icon: 'fas fa-city' },
    ],
    Karnataka: [
      { name: 'Bengaluru', icon: 'fas fa-city' },
      { name: 'Mysuru', icon: 'fas fa-city' },
    ],
    'Tamil Nadu': [
      { name: 'Chennai', icon: 'fas fa-city' },
      { name: 'Coimbatore', icon: 'fas fa-city' },
    ],
    Delhi: [
      { name: 'New Delhi', icon: 'fas fa-city' },
      { name: 'Old Delhi', icon: 'fas fa-city' },
    ],
    'West Bengal': [
      { name: 'Kolkata', icon: 'fas fa-city' },
      { name: 'Siliguri', icon: 'fas fa-city' },
    ],
    Punjab: [
      { name: 'Chandigarh', icon: 'fas fa-city' },
      { name: 'Amritsar', icon: 'fas fa-city' },
      { name: 'Ludhiana', icon: 'fas fa-city' },
    ],
    Haryana: [
      { name: 'Gurugram', icon: 'fas fa-city' },
      { name: 'Faridabad', icon: 'fas fa-city' },
      { name: 'Panipat', icon: 'fas fa-city' },
      { name: 'Sonepat', icon: 'fas fa-city' },
      { name: 'Palwal', icon: 'fas fa-city' },
    ],
    Rajasthan: [
      { name: 'Jaipur', icon: 'fas fa-city' },
      { name: 'Udaipur', icon: 'fas fa-city' },
      { name: 'Jodhpur', icon: 'fas fa-city' },
    ],
    'Uttar Pradesh': [
      { name: 'Lucknow', icon: 'fas fa-city' },
      { name: 'Kanpur', icon: 'fas fa-city' },
      { name: 'Agra', icon: 'fas fa-city' },
      { name: 'Noida', icon: 'fas fa-city' },
      { name: 'Greater Noida', icon: 'fas fa-city' },
    ],
    'Madhya Pradesh': [
      { name: 'Bhopal', icon: 'fas fa-city' },
      { name: 'Indore', icon: 'fas fa-city' },
      { name: 'Gwalior', icon: 'fas fa-city' },
    ],
  };
  selectedCaseType: any = null;
  selectedSubGroup: any = null;
  city: string = '';
  state: string = '';
  advertisement: string = '';
  pinCode: string = '';
  phone: string = '';
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  remarks: string = '';
  currentStep: number = 0; // Track the current step
  // This object will hold all the data to be sent to the API
  finalData = {
    caseType: '',
    subCaseType: '',
    state: '',
    city: '',
    pin: '',
    phone: '',
    advertisement: '',
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    remarks: '',
  };
  constructor(private miscService: MiscService, private enquiryService:EnquiryService) {}

  ngOnInit(): void {
    // Subscribe to modal visibility changes from the service
    this.modalSubscription = this.miscService.callModalVisibility$.subscribe(
      (isOpen) => {
        this.isCallModalOpen = isOpen;
      }
    );
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
  closeCallModal(): void {
    this.isCallModalOpen = false;
    this.miscService.closeCallModal(); // Close modal using the service
  }
  selectCaseType(caseType: any) {
    this.selectedCaseType = caseType;
    this.finalData.caseType = caseType.name;
    this.selectedSubGroup = null; // reset the selected subgroup when a new case type is selected
    this.currentStep = 1; // Move to the next step
  }

  selectSubGroup(subGroup: any) {
    this.selectedSubGroup = subGroup;
    this.finalData.subCaseType = subGroup.name;
    this.state = ''; // Reset state when a new subgroup is selected
    this.currentStep = 2; // Move to the next step
  }

  selectState(stateOption: any) {
    this.state = stateOption.name; // Set the selected state
    this.finalData.state = stateOption.name;
    this.city = ''; // Reset city when a new state is selected
    this.currentStep = 3; // Move to the next step
  }

  selectCity(cityOption: any) {
    this.city = cityOption.name; // Set the selected city
    this.finalData.city = cityOption.name;
    this.currentStep = 4; // Move to the next step
  }

  selectAdvertisement(advertisementOption: any) {
    this.advertisement = advertisementOption.name; // Set the selected state
    this.finalData.advertisement = advertisementOption.name;
    // this.city = ''; // Reset city when a new state is selected
    this.currentStep = 5; // Move to the next step
  }

  goBack() {
    if (this.currentStep > 0) {
      this.currentStep--; // Go back to the previous step
    }
  }

  nextStep() {
    if (this.currentStep < 7) {
      this.currentStep++; // Move to the next step
    }
  }
  submitPinCode() {
    // Handle the submission of details
    this.currentStep = 6; // Move to the next step
    this.finalData.pin = this.pinCode;
  }
  submitDetails() {
    // Handle the submission of details
    this.currentStep = 7; // Move to the next step
    this.finalData.title = this.title;
    this.finalData.firstName = this.firstName;
    this.finalData.lastName = this.lastName;
    this.finalData.email = this.email;
    this.finalData.remarks = this.remarks;

    this.finalData.phone = this.phone;
  }
  get progressPercentage() {
    return this.currentStep * 14.25;
  }
  saveData() {
    this.enquiryRequest.EnquiryType='Talk to Advocate';
    this.enquiryRequest.CaseType=this.finalData.caseType;
    this.enquiryRequest.CaseCategory=this.finalData.subCaseType;
    this.enquiryRequest.State=this.finalData.state;
    this.enquiryRequest.City=this.finalData.city;
    this.enquiryRequest.Howfound=this.finalData.advertisement;
    this.enquiryRequest.Pincode=this.finalData.pin;
    this.enquiryRequest.Title=this.finalData.title;
    this.enquiryRequest.FirstName=this.finalData.firstName;
    this.enquiryRequest.LastName=this.finalData.lastName;
    this.enquiryRequest.Email=this.finalData.email;   
    this.enquiryRequest.Phone=this.finalData.phone;
    this.enquiryRequest.Remarks=this.finalData.remarks;
    this.enquiryRequest.Question='';
    this.enquiryRequest.Subject=''
    this.enquiryService.InsertEnquiry(this.enquiryRequest).subscribe(
      (response) => {
        console.log(response.data);
      },
      (error) => {
        console.error('Error Inserting data', error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );   
    this.currentStep = 8; // Move to the next step
  }
}
