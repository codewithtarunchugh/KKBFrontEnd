import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MiscService } from 'src/app/core/services/Misc/misc.service';

@Component({
  selector: 'app-question-box',
  templateUrl: './question-box.component.html',
  styleUrls: ['./question-box.component.css'],
})
export class QuestionBoxComponent implements OnChanges {
  @Input() questionList: any[] = [];
  @Input() totalResult: number = 0;
  @Input() currentPage: number = 1; // Assuming this is one-based
  @Output() updateQuestionList: EventEmitter<number> = new EventEmitter();

  pages: number[] = [];
  displayPages: number[] = [];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private miscService: MiscService
  ) {}

  ngOnChanges(): void {
    this.updatePages(); // Update pages whenever input data changes
    this.updateDisplayPages();
  }

  updatePages(): void {
    this.pages = [];
    const totalPages = Math.ceil(this.totalResult / 10); // Assuming page size is 10
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  updateDisplayPages(): void {
    const totalPages = this.pages.length;

    // Determine start and end index for the display pages
    const maxDisplayedPages = 5; // Change this to display more/less pages
    const startIndex = Math.max(
      0,
      this.currentPage - Math.ceil(maxDisplayedPages / 2) - 1
    );
    const endIndex = Math.min(totalPages, startIndex + maxDisplayedPages);

    this.displayPages = this.pages.slice(startIndex, endIndex);

    // Adjust if there are fewer pages than maxDisplayedPages
    if (
      this.displayPages.length < maxDisplayedPages &&
      totalPages > maxDisplayedPages
    ) {
      const offset = maxDisplayedPages - this.displayPages.length;
      const adjustStart = Math.max(0, startIndex - offset);
      this.displayPages = this.pages.slice(adjustStart, endIndex);
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.pages.length) {
      return;
    }
    this.currentPage = page;
    this.updateQuestionList.emit(page); // Emit event to parent
    this.updateDisplayPages(); // Update displayed pages
    window.scrollTo(0, 0); // Scroll to top
  }

  navigateToQuestion(question: any): void {
    this.router.navigate(['/question-answers', question.id]);
  }

  trackByFn(index: number, item: any): number {
    return index;
  }
  getSanitizedContent(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  openAnswerModal(question: any) {
    this.miscService.openAnswerModal(question); // Use the service to open the modal
  }
}
