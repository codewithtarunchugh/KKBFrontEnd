import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css'],
})
export class MainSidebarComponent implements OnInit {
  userName: string | undefined;
  menuList: any[] = [];
  constructor(
    private userService: UserService,
    private menuService: MenuService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.userName = this.userService.getUserName();
    this.getAllMenuByRole();
    this.userService.$RefreshTokenReceived.subscribe((result) => {
      if (result) {
        this.getAllMenuByRole();
      }
    });
  }
  getAllMenuByRole() {
    this.menuService
      .getMenu(this.userService.getRoleFromStorage())
      .subscribe((result) => {
        if (result) {
          this.menuList = result.data;
        }
      });
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
