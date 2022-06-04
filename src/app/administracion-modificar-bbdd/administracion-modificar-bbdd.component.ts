import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import Swal from "sweetalert2"

@Component({
  selector: 'app-administracion-modificar-bbdd',
  templateUrl: './administracion-modificar-bbdd.component.html',
  styleUrls: ['./administracion-modificar-bbdd.component.scss']
})
export class AdministracionModificarBBDDComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }
  array=[]
  numeroCantidad = 0;
  ngOnInit(): void {
    this.service.servicio_select_numero_tweets().subscribe((data) => {
        this.array = JSON.parse(JSON.stringify(data));
        console.log(this.array)
    });
  }

  cambiarCantidad(cantidad:string){
    this.numeroCantidad = parseInt(cantidad);
    if(this.numeroCantidad > 19){
      this.service.servicio_cambiar_numero_tweets(this.numeroCantidad).subscribe();
      Swal.fire({
        title: 'El numero de tweets ha sido modificado',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      console.log(this.numeroCantidad);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El numero de tweets debe ser 20 o mayor',
      })
    }



  }



}
