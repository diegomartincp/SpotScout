import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  resultado: string = "";
  m2: string = "";
  medio: string = "";
  imagen = "../assets/images/experience.png";
  resultadoEsc = "0";
  m2Esc = "0";
  medioEsc = "0";

  nombresResEsc = [];
  valoracionResEsc = [];
  etiquetasResEsc = [];

  constructor(
    public service: ApiComunicationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  routing_busqueda(query:string){
    this.router.navigate(['/busqueda',query]);
  }

}


