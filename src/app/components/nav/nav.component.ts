import {Component, Input} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  @Input() username!: string;

  constructor(private authService: UserService, private router: Router) {
  }

  logoutAndGoToHome() {
    this.authService.logout()
    this.router.navigateByUrl('')
  }


}
