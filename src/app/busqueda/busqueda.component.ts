import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  resultado: string = "";
  m2: string = "";
  medio: string = "";

  nombresResEsc = [];
  valoracionResEsc = [];
  etiquetasResEsc = [];

  imagen = "../assets/images/experience.png";
  resultadoEsc = "0";
  m2Esc = "0";
  medioEsc = "0";

  constructor(
    public service: ApiComunicationService
  ) { }

  ngOnInit(): void {
  }
  /*funcion_general(query:string){
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.resultado);
      this.resultadoEsc = data.resultado;
    });
    this.service.servicio_precio(query).subscribe(data => {
      console.log(data.m2);
      console.log(data.medio);
      this.m2Esc = data.m2;
      this.medioEsc = data.medio;
    });
    this.service.servicio_restaurantes(query).subscribe(data => {
      console.log(data);
      console.log(data.nombre);
      console.log(data.valoracion);
      console.log(data.etiquetas);
      this.nombresResEsc = data.nombre;
      this.valoracionResEsc = data.valoracion;
      this.etiquetasResEsc = data.etiquetas;
    });
  }

  get_resultado_delito_odio(query:string){
    console.log("hola 1")
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.resultado);
      this.resultadoEsc = data.resultado;
    });
    console.log("hola 2")
  }*/

  funcion_general(query:string){
    this.service.servicio_busqueda(query).subscribe(data => {
      console.log(data.resultado);
      this.resultadoEsc = data.resultado;
      console.log(data.m2);
      console.log(data.medio);
      this.m2Esc = data.m2;
      this.medioEsc = data.medio;
      console.log(data.nombre);
      console.log(data.valoracion);
      console.log(data.etiquetas);
      this.nombresResEsc = data.nombre;
      this.valoracionResEsc = data.valoracion;
      this.etiquetasResEsc = data.etiquetas;
    });
  }
}
