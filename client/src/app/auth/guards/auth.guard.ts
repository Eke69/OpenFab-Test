import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UsersService);
  const router = inject(Router);
  if(userService.currentUser.token) return true;
  router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
  return false;
};
