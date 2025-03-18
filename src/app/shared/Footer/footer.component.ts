import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MiscService } from 'src/app/core/services/Misc/misc.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  searchQuery = '';
    constructor(
      private userService: UserService,
      private miscService: MiscService,
      private router: Router
    ) {}

  openCallModal() {
    this.miscService.openCallModal(); // Use the service to open the modal
  }
  openAskQuestionModal() {
    this.miscService.openAskQuestionModal(); // Use the service to open the modal
  }
  openServiceEnquiryModal(serviceType:any) {    
    this.miscService.openServiceEnquiryModal(serviceType); // Use the service to open the modal
  }
}
