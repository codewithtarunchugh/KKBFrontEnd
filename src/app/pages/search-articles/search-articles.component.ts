import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IQuestionRequest,
  ISearchQuestionRequest,
} from 'src/app/core/Models/interfaces/questions';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ContentService } from 'src/app/core/services/content/content.service';

@Component({
  selector: 'app-search-articles',
  templateUrl: './search-articles.component.html',
  styleUrls: ['./search-articles.component.css'],
})
export class SearchArticlesComponent implements OnInit {
  categoryId: number = 0;
  searchQuery: string = '';
  totalResult: number = 0;
  currentPage: number = 0;
  pages: number[] = [];
  displayPages: number[] = [];
  categoriesListCount: any[] = []; // Define the property
  selectedCategory: any;

  contentType: string | null = null;
  contentCategory: string | null = null;
  pageName: string | null = null;
  contentList: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentService,
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
      this.getSearchArticleBySearchText();
    }
    this.getCategoryListCount();
    this.categoryId = 0;
  }

  getSearchArticleBySearchText() {
    let postData: ISearchQuestionRequest = {
      searchQuery: this.searchQuery,
      categoryID: this.categoryId,
      pageSize: 10,
      pageIndex: this.currentPage + 1,
    };
    this.contentService.getSearchArticleList(postData).subscribe(
      (response) => {
        this.contentList = response.data;
        if (this.contentList != null) {
          this.totalResult = this.contentList[0].totalResultCount;
          console.log(this.contentList[0]);
          console.log(this.contentList[0].totalResultCount);
          this.pages = Array(Math.ceil(this.totalResult / 10))
            .fill(0)
            .map((x, i) => i);
        }
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.getSearchArticleBySearchText(); // Re-fetch data when page changes
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
    this.getSearchArticleBySearchText();
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.categoryId = category.id;
  }
  changePage(page: number): void {
    if (page < 0) {
      page = 0;
    } else if (page >= this.pages.length) {
      page = this.pages.length - 1;
    }
    this.currentPage = page;
    window.scrollTo(0, 0);

    this.updateDisplayPages();
  }
  updateDisplayPages(): void {
    if (this.currentPage === 0) {
      this.displayPages = this.pages.slice(0, 5);
    } else if (this.currentPage < 5) {
      this.displayPages = this.pages.slice(0, 5);
    } else if (this.currentPage >= this.pages.length - 5) {
      this.displayPages = this.pages.slice(this.pages.length - 5);
    } else {
      this.displayPages = this.pages.slice(
        this.currentPage - 2,
        this.currentPage + 3
      );
    }
  }
}
