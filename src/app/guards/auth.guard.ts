import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route, state) => {

  const authService: UserService = inject(UserService)
  const router: Router = inject(Router)

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate([''], {
      queryParams: {
        error: "Veuillez vous connectez !"
      }
    })
  }
  return false
};
