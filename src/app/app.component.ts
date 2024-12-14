import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showBackToTopButton = true;

  constructor(
    private router: Router,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        // After navigation, explicitly run change detection.
        this.cdr.detectChanges();
      }
    });
  }

  // Listen to the window scroll event
  // Function to scroll back to the top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
