import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-sentimiento',
  templateUrl: './sentimiento.component.html',
  styleUrls: ['./sentimiento.component.scss'],
})

//Componente sentimiento
export class SentimientoComponent implements OnInit {
  //Variable resultado
  //resultado : double = 0.0;
  resultado: string = "";
  m2: string = "";
  medio: string = "";
  imagen = "../assets/images/experience.png";
  resultadoEsc = "0";
  m2Esc = "0";
  medioEsc = "0";

  constructor(
    public service: ApiComunicationService
    ) {}

  ngOnInit(): void {
  //En inicio no es necesario hacer nada
  }

  funcion_general(query:string){
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.porcentaje_odio);
      this.resultadoEsc = data.porcentaje_odio;
    });
    this.service.servicio_precio(query).subscribe(data => {
      console.log(data.precio_m2);
      console.log(data.precio_viviendas);
      this.m2Esc = data.precio_m2;
      this.medioEsc = data.precio_viviendas;
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


/**
 * const that = this;
    this.dataService.GetFormById(+id).subscribe(response => {
      console.log(response);
      // const temp = response['TemplateJson'];
      that.data = response['TemplateJson'];
    })
 */
