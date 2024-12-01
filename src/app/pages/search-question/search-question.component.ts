import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IQuestionRequest,
  ISearchQuestionRequest,
} from 'src/app/core/Models/interfaces/questions';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { QuestionService } from 'src/app/core/services/question/question.service';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css'],
})
export class SearchQuestionComponent implements OnInit {
  categoryId: number = 0;
  searchQuery: string = '';
  questionList: any[] = [];
  totalResult: number = 0;
  currentPage: number = 0;
  pages: number[] = [];
  displayPages: number[] = [];
  categoriesListCount: any[] = []; // Define the property
  selectedCategory: any;
  searching: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo(0, 0);
      }
    });

    if (this.route.snapshot.paramMap.get('searchQuery') !== null) {
      this.searchQuery = this.route.snapshot.paramMap.get('searchQuery')!;
      this.currentPage = 0;
      this.getSearchQuestionsBySearchText();
    }
    this.getCategoryListCount();
    this.categoryId = 0;
  }

  getSearchQuestionsBySearchText() {
    this.searching = true;
    let postData: ISearchQuestionRequest = {
      searchQuery: this.searchQuery,
      categoryID: this.categoryId,
      pageSize: 10,
      pageIndex: this.currentPage + 1,
    };
    this.questionService.getSearchQuestionList(postData).subscribe(
      (response) => {
        this.questionList = response.data;
        if (this.questionList != null) {
          this.totalResult = this.questionList[0].totalResults;
          this.pages = Array(Math.ceil(this.totalResult / 10))
            .fill(0)
            .map((x, i) => i);
        }
        this.searching = false;
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.searching = false;
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.getSearchQuestionsBySearchText(); // Re-fetch data when page changes
  }

  getCategoryListCount() {
    this.categoryService.getCategoryCountList().subscribe(
      (response) => {
        this.categoriesListCount = response.data; // Populate the categoriesListCount
        if (this.categoriesListCount.length > 0) {
          this.categoryId = this.categoriesListCount[0].id;
        }
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
      }
    );
  }

  searchQuestions() {
    this.currentPage = 0;
    this.getSearchQuestionsBySearchText();
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.categoryId = category.id;
  }
}
