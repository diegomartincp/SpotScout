import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

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
    public service: ApiComunicationService
  ) { }

  ngOnInit(): void {
  }
  funcion_general(query:string){
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.porcentaje_odio);
      this.resultadoEsc = data.porcentaje_odio;
    });
    this.service.servicio_precio(query).subscribe(data => {
      console.log(data);
      console.log(data.precio_m2);
      console.log(data.precio_viviendas);
      this.m2Esc = data.precio_m2;
      this.medioEsc = data.precio_viviendas;
    });
    this.service.servicio_restaurantes(query).subscribe(data => {
      console.log(data);
      console.log(data.nombre);
      console.log(data.puntuacion);
      console.log(data.etiquetas);
      this.nombresResEsc = data.nombre;
      this.valoracionResEsc = data.puntuacion;
      this.etiquetasResEsc = data.etiquetas;
    });
  }

  get_resultado_delito_odio(query:string){
    console.log("hola 1")
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.porcentaje_odio);
      this.resultadoEsc = data.porcentaje_odio;
    });
    console.log("hola 2")
  }
}


