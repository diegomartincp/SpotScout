import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { Router } from '@angular/router';
import Swal from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
ejecutar: boolean=true;
  constructor(
    public service: ApiComunicationService,
    private router: Router
  ) { }
  ngOnInit(): void {
  }
  async funcion_login_usuario(correo:string, contrasena:string){
    this.ejecutar=true;
    console.log("1");
    const data = this.service.servicio_login_user(correo, contrasena).subscribe((data) => {
      console.log("2");
      localStorage.setItem('token', data.authorisation.token);
      const token_ = localStorage.getItem('token');
      console.log(token_);
      if(token_ && data.user.validado){ //Si token valido y esta validado
        this.router.navigate(['/admin']);
        this.ejecutar=false;
      }
      else{
        //
        //GESTIONAR ERROR EN INICIO SESION
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario no está validado',
        })
        this.ejecutar=false;
      }
    });
    await this.delay(400);
    if(this.ejecutar){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los datos no son correctos',
    })
    }

    console.log("3");
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
