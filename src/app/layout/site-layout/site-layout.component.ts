import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css'],
})
export class SiteLayoutComponent {
  showHeaderFooter: boolean = true;
  constructor(private router: Router) {
    // Subscribe to router events to check the current URL
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd) // Filter for NavigationEnd events
      )
      .subscribe((event) => {
        // Type guard to ensure event is NavigationEnd
        if (event instanceof NavigationEnd) {
          // Check if the current URL is '/login'
          //this.showHeaderFooter = event.url !== '/';
          this.showHeaderFooter = !['/login', '/'].includes(event.url);
        }
      });
  }
}
