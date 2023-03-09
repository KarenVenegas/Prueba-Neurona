import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit{
  formReg: FormGroup;

  constructor(private userSvc: UserService, private router: Router){

    this.formReg = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.userSvc.AddAdmin(this.formReg.value)
      .then(response => {
        console.log(response);
        alert('Administrador creado correctamente')
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error));
  }

}
