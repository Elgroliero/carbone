import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public error?: string | null

  constructor(
    private router: Router,
    private authService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngAfterContentChecked(){
    if (this.route.snapshot.queryParamMap.has('error')) {
      this.error = this.route.snapshot.queryParamMap.get('error')
    }
  }

  goToSummary() {
    this.router.navigate(['summary'])

  }

  login() {
    this.authService.login('JP')
    this.goToSummary()
  }


}
