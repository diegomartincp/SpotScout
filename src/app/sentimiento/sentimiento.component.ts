import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { Router } from '@angular/router';


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
    public service: ApiComunicationService,
    private router: Router
    ) {}

  ngOnInit(): void {
  //En inicio no es necesario hacer nada
  }

  funcion_general(){

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
