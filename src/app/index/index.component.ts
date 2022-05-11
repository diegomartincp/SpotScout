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

  constructor(
    public service: ApiComunicationService
  ) { }

  ngOnInit(): void {
  }
  funcion_general(query:string){
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
  }

  get_resultado_delito_odio(query:string){
    console.log("hola 1")
    this.service.servicio_delito_odio(query).subscribe(data => {
      console.log(data.resultado);
      this.resultadoEsc = data.resultado;
    });
    console.log("hola 2")
  }
}


