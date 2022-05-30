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
    this.service.servicio_registro_user(nombre,correo,contrasena).subscribe(data => {

      const token_ = localStorage.getItem('token');
      console.log(token_);

      if(token_ ){ //Si token valido y esta validado
        //MOSTRAR INFO
      }

    });
  }
}
