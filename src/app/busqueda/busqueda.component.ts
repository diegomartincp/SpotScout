import { Component, OnInit } from '@angular/core';
import { NEVER } from 'rxjs';
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
  numVivVent: string = "";
  numVivAlq: string = "";

  nombresResEsc = [];
  valoracionResEsc = [];
  etiquetasResEsc = [];
  nombresRestaurantes : string[] = [];
  valoracionesRestaurantes : string[] = [];
  etiquetasRestaurantes : string[] = [];
  imagen = "../assets/images/experience.png";
  resultadoEsc = "0";
  m2Esc = "0";
  medioEsc = "0";

  constructor(
    public service: ApiComunicationService
  ) { }

  ngOnInit(): void {
  }


  funcion_general(query:string){
    this.service.servicio_busqueda(query).subscribe(data => {
      console.log(data.porcentaje_odio);
      this.resultadoEsc = data.porcentaje_odio;
      console.log(data.precio_m2);
      console.log(data.precio_viviendas);
      this.m2Esc = data.precio_m2;
      this.medioEsc = data.precio_viviendas;

      console.log(data.num_viviendas_venta);
      console.log(data.num_viviendas_alquiler);
      this.numVivVent = data.num_viviendas_venta;
      this.numVivAlq = data.num_viviendas_alquiler;


      console.log(data.nombre);
      console.log(data.puntuacion);
      console.log(data.etiquetas);
      this.nombresResEsc = data.nombre;
      this.valoracionResEsc = data.puntuacion;
      this.etiquetasResEsc = data.etiquetas;

      String(this.nombresResEsc).replace('"', '')
      String(this.nombresResEsc).replace('[', '')

      var str = String(this.nombresResEsc);
      var nombresRestaurantes = [];
      nombresRestaurantes = str.split(",");
      console.log(nombresRestaurantes)
      this.nombresRestaurantes = nombresRestaurantes;

      String(this.valoracionResEsc).replace('"', '')
      String(this.valoracionResEsc).replace('[', '')

      var str = String(this.valoracionResEsc);
      var valoracionesRestaurantes = [];
      valoracionesRestaurantes = str.split(",");
      console.log(valoracionesRestaurantes)
      this.valoracionesRestaurantes = valoracionesRestaurantes;

      String(this.etiquetasResEsc).replace('"', '')
      String(this.etiquetasResEsc).replace('[', '')

      var str = String(this.etiquetasResEsc);
      var etiquetasRestaurantes = [];
      etiquetasRestaurantes = str.split(",");
      console.log(etiquetasRestaurantes)
      this.etiquetasRestaurantes = etiquetasRestaurantes;


    });
  }
}
