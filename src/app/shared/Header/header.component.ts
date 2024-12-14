import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchQuery = '';
  constructor(private userService: UserService, private router: Router) {}
  logout() {
    this.userService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
