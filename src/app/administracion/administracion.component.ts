import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {

  constructor(public service: ApiComunicationService,private router: Router) { }
  array=[]
  ngOnInit(): void {

    const token_ = localStorage.getItem('token');
    if(token_){
      console.log("Ventana carga")
    }
    else{
      this.router.navigate(['/login']);
    }

      const data = this.service.servicio_select_busquedas().subscribe((data) => {
        this.array = JSON.parse(JSON.stringify(data));
        console.log(this.array)
      });

  }

}
