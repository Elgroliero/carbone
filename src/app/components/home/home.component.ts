import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  public error?: string | null
  public username: string = '';
  public password: string = '';
  public errors : string[] = []

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

  onSubmit(){

    console.log(this.username)
    console.log(this.password)
    this.errors = []

    if(this.username.length < 3){
      this.errors.push("Le login doit faire au moins 3 caractères !")
    }
    if(this.password.length <= 5){
      this.errors.push("Le mot de passe doit faire au moins 6 caractères !")
    }

    if(this.errors.length == 0){
      this.login()
    }
  }

  login() {
    this.authService.login(this.username)
    this.goToSummary()
  }


}
