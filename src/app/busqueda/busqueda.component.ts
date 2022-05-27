import { Component, OnInit } from '@angular/core';
import { NEVER } from 'rxjs';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { ActivatedRoute } from '@angular/router';
//import {Chart} from 'node_modules/chart.js';
import Chart from 'chart.js/auto';

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

  tweets:number[] = [];
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

  query:any=""
  constructor(
    public service: ApiComunicationService,
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.chart2();
    this._Activatedroute.paramMap.subscribe(params => {
      this.query = params.get('query');
      console.log(this.query);
      if(this.query){this.funcion_general(this.query)}
  });
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
//Tweets
      this.tweets= data.ultimos_100;
      console.log(this.tweets);
/*
      for(let i = 0; i <= this.tweets.length; i++){
        this.tweets[i]=this.tweets[i]*10;
      }
      */
      this.chart2();
    });
  }
//CHARTS
chart(){
  var myLineChart = new Chart("myAreaChart", {
    type: 'line',
    data: {
      labels: ["AAAAA", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "AWEBO MINEGRO"],
      datasets: [{
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,

        data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 80000],
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
      }}
    })



}

//CHART 2
chart2(){
  var labels_=Array.from(Array(100).keys());

  var myLineChart = new Chart("myAreaChart", {
    type: 'line',
    data: {
      labels: labels_,
      datasets: [{
        label: "Sentimiento",
        tension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: this.tweets,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: {
          time: {
            unit: "minute"
          },
          ticks: {
            maxTicksLimit: 7
          }
        },
        yAxes: {
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
          }
        }
      }

    }
  })
}

}
