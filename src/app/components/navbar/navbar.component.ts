import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-dark bg-dark">
  <button class="btn btn-outline-danger " routerLink="/create-admin">Agregar administrador</button>
  <span class="navbar-brand mb-0 h1">App Empleados - Angular y Firebase</span>
  <button (click)="onClick()" class="btn btn-outline-danger ">Logout</button>
</nav>
`
})
export class NavbarComponent implements OnInit {

  constructor(private userSvc: UserService, private router: Router){

  }
  ngOnInit(): void {

  }
  onClick() {
    this.userSvc.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
