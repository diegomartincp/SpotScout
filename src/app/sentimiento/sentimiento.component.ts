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
  resultado : Number = 0;
  imagen = "";
  resultadoEsc ="";

  constructor(public service: ApiComunicationService) {

  }

  ngOnInit(): void {
    //En inicio no hace nada
    this.imagen = "../assets/images/experience.png";
  }

  async get_api_comunication_result(texto_a_analizar:string){
    (await this.service.get_resultado_api(texto_a_analizar)).subscribe(data => {this.resultado = data.resultado;
    if(this.resultado > 0){
      this.imagen = "../assets/images/feliz.png";
      this.resultadoEsc = "Positivo"
    }else if (this.resultado < 0){
      this.imagen = "../assets/images/triste.png";
      this.resultadoEsc = "Negativo"
    }else{
      this.imagen = "../assets/images/experience.png";
      this.resultadoEsc = "Neutral"
    }});

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
