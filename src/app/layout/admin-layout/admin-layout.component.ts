import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  ngOnInit(): void {
    // Redirect to an external HTML page
    // window.location.href = 'adminindex.html'; // Path to the external admin page
  }
}
