import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public service: ApiComunicationService
  ) { }
  ngOnInit(): void {
  }
  funcion_login_usuario(correo:string, contrasena:string){
    this.service.servicio_login_user(correo, contrasena)
  }
}
