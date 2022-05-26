import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-administracion-query',
  templateUrl: './administracion-query.component.html',
  styleUrls: ['./administracion-query.component.scss']
})
export class AdministracionQueryComponent implements OnInit {
  array=[]
  constructor(public service: ApiComunicationService) { }

  ngOnInit(): void {
  }
  funcion_general(query:string){
    this.service.servicio_select_query(query).subscribe(data => {
      this.array = JSON.parse(JSON.stringify(data));
    });
  }

}
