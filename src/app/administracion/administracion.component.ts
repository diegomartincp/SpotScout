import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }
  array=[]
  ngOnInit(): void {

      const data = this.service.servicio_select_busquedas().subscribe((data) => {
        this.array = JSON.parse(JSON.stringify(data));
        console.log(this.array)
      });

  }

}
