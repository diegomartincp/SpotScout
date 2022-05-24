import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio


@Component({
  selector: 'app-acceder',
  templateUrl: './acceder.component.html',
  styleUrls: ['./acceder.component.scss']
})
export class AccederComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }

  ngOnInit(): void {
  }
  crear_usuario(nombre:string, correo:string, contrasena:string, tipo_user:string){
    this.service.servicio_registro_user(nombre,correo,contrasena,tipo_user).subscribe(data => {
      console.log(data);
      console.log(data.nombre);
      console.log(data.valoracion);
      console.log(data.etiquetas);
    });
  }
}
