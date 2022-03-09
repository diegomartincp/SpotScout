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
  resultado = " -> Aquí aparecerá el resultado";
  //resultado = "";

  constructor(public service: ApiComunicationService) {

  }

  ngOnInit(): void {
    //En inicio no hace nada
  }


  async get_api_comunication_result(texto_a_analizar:string){
    (await this.service.get_resultado_api(texto_a_analizar)).subscribe(data => (this.resultado = data.resultado));
  }

}
