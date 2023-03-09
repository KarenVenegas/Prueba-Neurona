import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Usuario from 'src/interfaces/usuario.interface';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.scss']
})
export class ListEmpleadosComponent implements OnInit{
  usuarios: Usuario[];

  constructor(
    private userSvc: UserService
   ){
    this.usuarios =[{
      nombre:'Karen',
      cedula: 1234
    }];
  }

  ngOnInit(): void {
    this.userSvc.getUsuarios().subscribe(usuarios=>{
      this.usuarios = usuarios;
    });
  }
}


