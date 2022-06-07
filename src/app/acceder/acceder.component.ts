import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import Swal from "sweetalert2"
import { Router } from '@angular/router';


@Component({
  selector: 'app-acceder',
  templateUrl: './acceder.component.html',
  styleUrls: ['./acceder.component.scss']
})
export class AccederComponent implements OnInit {
  terminos: boolean=false;
  constructor(public service: ApiComunicationService, private router: Router) { }

  ngOnInit(): void {
  }

  //Comprobar que se ha pulsado el boton de terminos de uso
  fieldsChange(values:any):void {
    console.log(values.currentTarget.checked);
    if(values.currentTarget.checked){
    this.terminos=true;
    }
    else{
      this.terminos=false;
    }
  }


  validar_email( email:string ){
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  crear_usuario(nombre:string, correo:string, contrasena1:string, contrasena2:string, checkbox: string){
    //comprobar que todos los campos esten completos
    if(nombre=="" || correo=="" || contrasena1==""||contrasena2==""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Rellene todos los campos',
      })
      //comprobar email
    }else if(!this.validar_email(correo)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe introducir un correo valido',
      })
    }
    //comprobar que las contraseñas coincidad y este aceptados los terminos y condiciones
    else if(contrasena1===contrasena2 && this.terminos){
      console.log("Vamos a registrar");

      this.service.servicio_registro_user(nombre,correo,contrasena1).subscribe(data => {
        const token_ = localStorage.getItem('token');
        console.log(token_);
        if(token_ ){ //Si token valido y esta validado
          Swal.fire({
            title: 'Te has registrado con éxito',
            text: "Tu cuenta será validada en los próximos minutos",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Volver al inicio'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/index']);
            }
          })
        }
      });
    }
    else if(!this.terminos){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Acepte los términos y condiciones',
      })
    }
    else{
      console.log("no coincide")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      })
    }


  }
}
