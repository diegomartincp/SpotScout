import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import Swal from "sweetalert2"


@Component({
  selector: 'app-administracion-validacion',
  templateUrl: './administracion-validacion.component.html',
  styleUrls: ['./administracion-validacion.component.scss']
})
export class AdministracionValidacionComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }
  array=[]
  ngOnInit(): void {
    const data = this.service.servicio_select_user().subscribe((data) => {
      this.array = JSON.parse(JSON.stringify(data));
      console.log(this.array)
    });
  }

  validar(id:number){
    this.service.servicio_update_user_validar(id).subscribe();
    Swal.fire({
      title: 'Usuario validado',
      text: "El usuario tiene permisos de administracion",
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
  }

}
