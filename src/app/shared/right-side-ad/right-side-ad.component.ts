import { Component } from '@angular/core';
import { MiscService } from 'src/app/core/services/Misc/misc.service';

@Component({
  selector: 'app-right-side-ad',
  templateUrl: './right-side-ad.component.html',
  styleUrls: ['./right-side-ad.component.css'],
})
export class RightSideAdComponent {
  constructor(private miscService: MiscService) {}
  openCallModal() {
    this.miscService.openCallModal(); // Use the service to open the modal
  }
}
