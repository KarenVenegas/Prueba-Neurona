import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss']
})
export class CreateEmpleadoComponent  {
  formulario: FormGroup;
  constructor(private userSvc: UserService){
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      cedula: new FormControl(),
    })
  }
  ngOnInit():void{

  }
  async onSubmit(){
    const response = await this.userSvc.addUsuario(this.formulario.value);
  }


}
