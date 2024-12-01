import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/category/category.service';

@Component({
  selector: 'app-question-category',
  templateUrl: './question-category.component.html',
  styleUrls: ['./question-category.component.css'],
})
export class QuestionCategoryComponent implements OnInit {
  searchQuery = '';
  categoriesListCount: any[] = [];
  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        window.scrollTo(0, 0);
      }
    });
    this.getCategoryListCount();
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
}
