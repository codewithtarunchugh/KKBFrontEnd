import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FaqService } from 'src/app/core/services/faq/faq.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IFAQRequest } from 'src/app/core/Models/interfaces/questions';
import { MiscService } from 'src/app/core/services/Misc/misc.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnChanges {
  @Input() categoryID: any = 0;
  @Input() categoryName: any = '';
  isFAQModalOpen = true; // Control the modal visibility
  FAQList: any[] = [];
  expandedIndex: number | null = null;
  modalSubscription: Subscription = new Subscription();

  // Modal related properties
  isModalOpen: boolean = false;
  selectedFAQ: any = null;

  constructor(
    private faqService: FaqService,
    private sanitizer: DomSanitizer,
    private miscService: MiscService
  ) {}
  ngOnInit(): void {
    // Subscribe to modal visibility changes from the service
    this.modalSubscription = this.miscService.modalVisibility$.subscribe(
      (isOpen) => {
        this.isFAQModalOpen = isOpen;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
  ngOnChanges(): void {
    this.getFAQByCategory();
  }

  // Toggle function for expanding/collapsing FAQs
  toggleFAQ(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null; // Collapse if already expanded
    } else {
      this.expandedIndex = index; // Expand the clicked FAQ
    }
  }

  // Fetch FAQ list based on category
  getFAQByCategory(): void {
    let postData: IFAQRequest = {
      categoryId: this.categoryID,
      categoryName: this.categoryName,
    };
    this.faqService.getFAQByCategory(postData).subscribe(
      (response) => {
        this.FAQList = response.data;
        console.log(this.categoryID);
        console.log(this.FAQList);
      },
      (error) => {
        console.error('Error fetching FAQ ', error);
      }
    );
  }

  // Open the modal and set the selected FAQ
  openModal(index: number): void {
    this.selectedFAQ = this.FAQList[index];
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedFAQ = null; // Reset selected FAQ
  }

  // Sanitizing HTML content before using innerHTML
  getSanitizedContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  closeFAQModal(): void {
    this.isFAQModalOpen = false;
    this.miscService.closeModal(); // Close modal using the service
  }
}
