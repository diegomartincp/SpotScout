import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-administracion-cache',
  templateUrl: './administracion-cache.component.html',
  styleUrls: ['./administracion-cache.component.scss']
})
export class AdministracionCacheComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }
  array=[]
  ngOnInit(): void {
    const data = this.service.servicio_select_cache().subscribe((data) => {
      this.array = JSON.parse(JSON.stringify(data));
      console.log(this.array)
    });

  }

}
