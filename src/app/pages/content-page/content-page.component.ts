import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICategoryContentRequest,
  IContentRequest,
} from 'src/app/core/Models/interfaces/content';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { ContentService } from 'src/app/core/services/content/content.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.css'],
})
export class ContentPageComponent implements OnInit {
  categoryId: number = 0;
  contentType: string | null = null;
  contentCategory: string | null = null;
  pageName: string | null = null;
  contentList: any[] = [];
  searching: boolean = false; // Add a boolean flag to indicate search in progress
  categoriesListCount: any[] = [];
  searchQuery = '';
  totalResult: number = 0;
  currentPage: number = 0;
  displayPages: number[] = [];
  pages: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private categoryService: CategoryService
  ) {
    // this.script = 'alert("Hello World!");';
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.contentType = params.get('contentType');
      this.contentCategory = params.get('contentCategory');
      this.pageName = params.get('pageName');

      console.log('Content Type:', this.contentType);
      console.log('Content Category:', this.contentCategory);
      console.log('Page Name:', this.pageName);
      this.displayPages = this.pages.slice(0, 5);
      if (this.pageName && this.contentCategory && this.contentType) {
        this.getContentByPageNameCategoryContentType();
      } else if (this.contentType) {
        if (this.contentCategory) {
          this.currentPage = 0;
          this.getContentByCategoryAndContentType();
          this.updateDisplayPages();
        } else {
          this.getCategoryListCount();
        }
      }
    });
  }
  getContentByPageNameCategoryContentType() {
    this.searching = true; // Set the flag to true when search starts
    let postData: IContentRequest = {
      PageName: this.pageName,
      Category: this.contentCategory,
      ContentType: this.contentType,
    };

    this.contentService
      .getContentByPageNameCategoryContentType(postData)
      .subscribe(
        (response) => {
          this.contentList = response.data;
          this.searching = false; // Set the flag to false when search completes

          if (
            !this.contentList ||
            this.contentList.length === 0 ||
            !this.contentList[0].content
          ) {
            this.router.navigate(['/404']);
          }
          console.log(this.contentList);
        },
        (error) => {
          this.searching = false; // Set the flag to false when search completes
          console.error('Error fetching Category List with Count:', error);
          // Handle the error here (e.g., show an error message to the user)
        }
      );
  }
  getContentByCategoryAndContentType() {
    this.searching = true; // Set the flag to true when search starts
    let postData: ICategoryContentRequest = {
      categoryName: this.contentCategory,
      contentTypeName: this.contentType,
      pageNumber: this.currentPage + 1,
      pageSize: 10,
    };

    this.contentService
      .GetAllContentByCategoryAndContentType(postData)
      .subscribe(
        (response) => {
          this.contentList = response.data;
          this.searching = false; // Set the flag to false when search completes

          if (this.contentList != null) {
            this.totalResult = this.contentList[0].totalResultCount;
            this.pages = Array(Math.ceil(this.totalResult / 10))
              .fill(0)
              .map((x, i) => i);
          }

          if (
            !this.contentList ||
            this.contentList.length === 0 ||
            !this.contentList[0].content
          ) {
            this.router.navigate(['/404']);
          }
          console.log('category ' + this.contentList);
        },
        (error) => {
          this.searching = false; // Set the flag to false when search completes
          console.error('Error fetching Category List with Count:', error);
          // Handle the error here (e.g., show an error message to the user)
        }
      );
  }

  get sanitizedHtmlContent() {
    if (
      this.contentList &&
      this.contentList.length > 0 &&
      this.contentList[0].content
    ) {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.contentList[0].content
      );
    } else {
      return '';
    }
  }

  getCategoryListCount() {
    this.categoryService.getCategoryCountList().subscribe(
      (response) => {
        this.categoriesListCount = response.data;
      },
      (error) => {
        console.error('Error fetching Category List with Count:', error);
        // Handle the error here (e.g., show an error message to the user)
      }
    );
  }
  changePage(page: number): void {
    if (page < 0) {
      page = 0;
    } else if (page >= this.pages.length) {
      page = this.pages.length - 1;
    }
    this.currentPage = page;
    window.scrollTo(0, 0);
    this.getContentByCategoryAndContentType();
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
