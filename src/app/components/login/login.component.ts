import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  errorMessage: string='';
  formLogin: FormGroup;

  constructor(private userSvc: UserService, private router: Router
  ){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.userSvc.login(this.formLogin.value)
      .then(response => {
        this.router.navigate(['/main']);
        console.log(response);
      })
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
