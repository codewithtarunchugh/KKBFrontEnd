import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css'],
})
export class MainHeaderComponent {
  constructor(private router: Router, private userService: UserService) {}
  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
