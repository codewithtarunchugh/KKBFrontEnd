import { CanActivateFn, Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const menuService = inject(MenuService);
  if (userService.IsLoggedIn()) {
    // Current User Role
    let userRole = userService.getRoleFromStorage();

    // Allowed role from router module
    const role = route.data['roles'] as Array<string>;
  } else {
    alert('Access Denied');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
