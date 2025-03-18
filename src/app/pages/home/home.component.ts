import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { MiscService } from 'src/app/core/services/Misc/misc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categoriesListCount: any[] = [];
  totalQuestionCount: number = 0;
  constructor(private categoryService: CategoryService, private miscService: MiscService,) {}

  ngOnInit(): void {
    this.getCategoryListCount();
  }
  getCategoryListCount() {
    this.categoryService.getCategoryCountList().subscribe(
      (response) => {
        this.categoriesListCount = response.data;

        // Calculate the total count by summing the `totalCount` property of each item
        this.totalQuestionCount = this.categoriesListCount.reduce(
          (sum, category) => {
            return sum + (category.totalCount || 0); // Ensure to handle cases where totalCount may be undefined or null
          },
          0
        );
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );
  }
  openCallModal() {
    this.miscService.openCallModal(); // Use the service to open the modal
  }
  openServiceEnquiryModal(serviceType:any) {    
    this.miscService.openServiceEnquiryModal(serviceType); // Use the service to open the modal
  }
  openAskQuestionModal() {
    this.miscService.openAskQuestionModal(); // Use the service to open the modal
  }
}
