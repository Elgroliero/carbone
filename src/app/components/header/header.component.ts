import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NavComponent} from "../nav/nav.component";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NavComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public username!: string

  constructor(private router: Router, private authService : UserService) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  goToProfile() {
    this.router.navigate(['profile', this.username])
  }
}
