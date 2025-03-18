import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IQuestionRequest } from 'src/app/core/Models/interfaces/questions';
import { MiscService } from 'src/app/core/services/Misc/misc.service';
import { QuestionService } from 'src/app/core/services/question/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit, OnDestroy {
  categoryId: number = 0;
  categoryName: string = '';
  questionList: any[] = [];
  totalResult: number = 0;
  currentPage: number = 1;
  searching: boolean = false;
  private routeSub: Subscription = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private miscService: MiscService
  ) {}

  ngOnDestroy(): void {
    // Clean up subscription when the component is destroyed
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const categoryIdParam = params.get('categoryId');
      if (categoryIdParam !== null) {
        this.categoryId = +categoryIdParam;
        this.categoryName = ''; // Reset or update category name if necessary
        this.getQuestionsByCategory();
      }
    });
  }

  getQuestionsByCategory(): void {
    let postData: IQuestionRequest = {
      categoryID: this.categoryId,
      pageSize: 10,
      pageIndex: this.currentPage,
    };
    this.questionService.getQuestionList(postData).subscribe(
      (response) => {
        this.questionList = response.data;
        if (this.questionList != null) {
          this.totalResult = this.questionList[0]?.totalResults || 0;
        }
        this.searching = false;
        console.log(this.totalResult);
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
        this.searching = false;
      }
    );
  }

  // New Method: Handle page change event from child
  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.getQuestionsByCategory(); // Re-fetch data when page changes
  }
  openFAQModal() {
    this.miscService.openModal(); // Use the service to open the modal
  }
  openCallModal() {
    this.miscService.openCallModal(); // Use the service to open the modal
  }
}
