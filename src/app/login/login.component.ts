import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public service: ApiComunicationService,
    private router: Router
  ) { }
  ngOnInit(): void {
  }
  funcion_login_usuario(correo:string, contrasena:string){
    const data = this.service.servicio_login_user(correo, contrasena).subscribe((data) => {
      localStorage.setItem('token', data.authorisation.token);
      const token_ = localStorage.getItem('token');
      console.log(token_);
      if(token_){
        this.router.navigate(['/admin']);
      }
      else{
        //GESTIONAR ERROR EN INICIO SESION
        console.log("ERROR LOGIN");
      }
    });
  }
}
