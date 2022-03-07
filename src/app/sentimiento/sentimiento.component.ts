import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio

@Component({
  selector: 'app-sentimiento',
  templateUrl: './sentimiento.component.html',
  styleUrls: ['./sentimiento.component.scss'],
})

//Componente sentimiento
export class SentimientoComponent implements OnInit {
  //Variable texto
  texto = "";
  //Variable resultado
  resultado="-";

  constructor(public service: ApiComunicationService) { } //Se añade en este paréntesis el servicio

  ngOnInit(): void {

  }

  get_resultado_sentimiento(texto:string){
    //Asignamos la variable resultado usando el servicio
    this.resultado = texto
    //this.resultado = this.service.get_resultado()
  }

}
