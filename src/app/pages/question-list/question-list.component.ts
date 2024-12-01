import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestionRequest } from 'src/app/core/Models/interfaces/questions';
import { QuestionService } from 'src/app/core/services/question/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  categoryId: number = 0;
  questionList: any[] = [];
  totalResult: number = 0;
  currentPage: number = 1;
  searching: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('categoryId') !== null) {
      this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
      this.getQuestionsByCategory();
    }
  }

  getQuestionsByCategory(): void {
    this.searching = true;
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
}
