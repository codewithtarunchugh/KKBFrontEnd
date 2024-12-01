import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fillBreadcrumbs();
  }

  fillBreadcrumbs(): void {
    const url = this.router.url;
    const segments = url.split('/');
    const breadcrumbs: any[] = [];

    segments.forEach((segment, index) => {
      if (segment !== '') {
        const breadcrumb = {
          label: segment.charAt(0).toUpperCase() + segment.slice(1),
          url: '/' + segments.slice(0, index + 1).join('/'),
        };
        breadcrumbs.push(breadcrumb);
      }
    });

    this.breadcrumbs = breadcrumbs;
    console.log(this.breadcrumbs);
  }
}
