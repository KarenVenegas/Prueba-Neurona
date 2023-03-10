import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit{
  loading = false;
  formReg: FormGroup;

  constructor(private userSvc: UserService, private router: Router,private toastr: ToastrService){

    this.formReg = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
  }
  ngOnInit(): void {
  }

  hasError = false;
  errorMessage = '';

  async onSubmit() {
    try {
      this.loading = true;
      await this.userSvc.AddAdmin(this.formReg.value);
      this.toastr.success('El empleado fue registrado con éxito', 'Empleado Registrado', {positionClass: 'toast-bottom-right'});
      this.router.navigate(['/main']);
    } catch (error: any) {
        console.error('Error al crear el usuario:', error);
        if (error.message === 'Todos los campos son obligatorios') {
          this.toastr.error(error.message, 'Complete todos los campos', { positionClass: 'toast-bottom-right' });
        } else if (error.message === 'La contraseña debe tener al menos 6 caracteres') {
          this.toastr.error(error.message,'La contraseña ingresada es muy corta', { positionClass: 'toast-bottom-right' });
        } else if (error.message === 'El correo electrónico ya está registrado') {
          this.toastr.error(error.message,'Usuario duplicado',{ positionClass: 'toast-bottom-right' });
        } else if (error.code === 'auth/admin-restricted-operation') {
          this.toastr.error(error.message,'No tiene permisos de administrador para crear un usuario.',{ positionClass: 'toast-bottom-right' });
        } else if (error.code === 'auth/invalid-email') {
          this.toastr.error(error.message,'El correo electrónico ingresado es inválido.',{ positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error('Ocurrió un error al crear el usuario.');
        }
      }finally {
        this.loading = false;
    }
}
}
