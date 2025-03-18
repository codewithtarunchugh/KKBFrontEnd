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
  selector: 'app-service-enquiry',
  templateUrl: './service-enquiry.component.html',
  styleUrls: ['./service-enquiry.component.css']
})
export class ServiceEnquiryComponent implements OnInit, OnDestroy {
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
  serviceTypeSubscription: Subscription = new Subscription();
  isServiceEnquiryModalOpen = true; // Control the modal visibility
  serviceType="";
  serviceTypes = [
    {
      id: 1,
      name: 'Business Registration',
      icon: 'fas fa-envelope',
      subGroups: [
        { name: 'Pvt Ltd Company', icon: 'fas fa-file-alt' },
        {
          name: 'Limited Liability Partnership',
          icon: 'fas fa-file-invoice',
        },
        { name: 'One Person Company', icon: 'fas fa-money-check-alt' },
        {
          name: 'Partnership Firm',
          icon: 'fas fa-gavel',
        },
        {
          name: 'Sole Proprietorship',
          icon: 'fas fa-gavel',
        },
      ],
    },
    {
      id: 2,
      name: 'Licenses',
      icon: 'fas fa-home',
      subGroups: [
        { name: 'ISO Registration', icon: 'fas fa-map-signs' },
        { name: 'FSSAI Registration', icon: 'fas fa-registered' },
        { name: 'IEC Registration', icon: 'fas fa-search' },
        { name: 'Estate Planning', icon: 'fas fa-calendar-alt' },
        { name: 'LIQUOR License Registration', icon: 'fas fa-users-cog' },
        { name: 'PSARA Registration', icon: 'fas fa-scroll' },      
      ],
    },
    {
      id: 3,
      name: 'Protect Your Intellectual Property',
      icon: 'fas fa-users',
      subGroups: [
        {
          name: 'Trademark Registration',
          icon: 'fas fa-heart-broken',
        },
        { name: 'Copyright Registration', icon: 'fas fa-money-bill-wave' },
        { name: 'Patent Registration', icon: 'fas fa-child' },
        { name: 'Trademark Objection', icon: 'fas fa-mosque' },
        { name: 'Trademark Infringement', icon: 'fas fa-fist-raised' },    
      ],
    },
    {
      id: 4,
      name: 'GST File',
      icon: 'fas fa-gavel',
      subGroups: [
        { name: 'GST Registration', icon: 'fas fa-bullhorn' },
        { name: 'GST Filling', icon: 'fas fa-envelope' },
        { name: 'GST Cancellation and Revocation', icon: 'fas fa-money-check-alt' },
        { name: 'Reply to GST Notice', icon: 'fas fa-dollar-sign' },
        { name: 'Indirect Tax', icon: 'fas fa-balance-scale' },       
      ],
    },
    {
      id: 5,
      name: 'Legal Documents',
      icon: 'fas fa-gavel',
      subGroups: [
        { name: 'Affidavits', icon: 'fas fa-bullhorn' },
        { name: 'Agreements', icon: 'fas fa-envelope' },
        { name: 'Marriage Registration', icon: 'fas fa-money-check-alt' },
        { name: 'Property Documents', icon: 'fas fa-dollar-sign' },
        { name: 'FIR & Police Services', icon: 'fas fa-balance-scale' }, 
        { name: 'Vehicle Documents', icon: 'fas fa-balance-scale' }, 
        { name: 'Identity & Certificates', icon: 'fas fa-balance-scale' },       
        { name: 'Utility & Government Services', icon: 'fas fa-balance-scale' },       
        { name: 'Registration Services', icon: 'fas fa-balance-scale' },       
      ],
    },
    {
      id: 6,
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
    this.modalSubscription = this.miscService.serviceEnquiryModalVisibility$.subscribe(
      (isOpen) => {
        this.isServiceEnquiryModalOpen = isOpen;
        this.serviceTypeSubscription = this.miscService.serviceType$.subscribe((serviceType) => {
          this.serviceType = serviceType;
          if(this.serviceType!="")
            {
              this.finalData.caseType=this.serviceType;
              this.finalData.subCaseType=this.serviceType;
              this.currentStep=2;
            }          
        });
      }
    );
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
  closeServiceEnquiryModal(): void {
    this.isServiceEnquiryModalOpen = false;
    this.miscService.closeServiceEnquiryModal(); // Close modal using the service
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
    // Save the final data to the server
    this.enquiryRequest.EnquiryType='Service Request';
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
