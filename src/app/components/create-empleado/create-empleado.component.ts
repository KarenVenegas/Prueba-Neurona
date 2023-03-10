import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss']
})
export class CreateEmpleadoComponent implements OnInit {
  formulario: FormGroup;
  loading = false;

  constructor(private userSvc: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router:Router,
    private aRoute: ActivatedRoute){

    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
    })
  }
  ngOnInit():void{

  }
  async onSubmit(){
    try {
      this.loading = true;
      const response = await this.userSvc.addUsuario(this.formulario.value);
      this.toastr.success('El empleado fue registrado con éxito','Empleado Registrado',{positionClass:'toast-bottom-right'});
      this.router.navigate(['/main']);
    } catch (error: any) {
      if (error.message === 'Todos los campos son obligatorios.') {
        this.toastr.error(error.message, 'Error al agregar el usuario', { positionClass: 'toast-bottom-right' });
      } else if (error.message === 'La cédula de identidad ya está registrada.') {
        this.toastr.error(error.message, 'Error al agregar el usuario', { positionClass: 'toast-bottom-right' });
      } else {
        this.toastr.error('Ocurrió un error al agregar el usuario', 'Error', { positionClass: 'toast-bottom-right' });
      }
    } finally {
      this.loading = false;
  }
}
}
