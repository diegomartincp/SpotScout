import { Component, OnInit } from '@angular/core';
import { NEVER } from 'rxjs';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { ActivatedRoute } from '@angular/router';
//import {Chart} from 'node_modules/chart.js';
import Chart from 'chart.js/auto';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  numVivVent: string = "";
  numVivAlq: string = "";

  tweets:string = "";

  nombresRestaurantes : string[] = [];
  valoracionesRestaurantes : string[] = [];
  etiquetasRestaurantes : string[] = [];

  resultadoEsc = 0;

  m2Esc = "";
  medioEsc = "";

  query:any=""

  cargando: boolean = false;

  myLineChart:any;

  constructor(
    public service: ApiComunicationService,
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.chart_odio();
    this.cargando=false;
    this._Activatedroute.paramMap.subscribe(params => {
      this.query = params.get('query');
      console.log(this.query);
      if(this.query){this.funcion_general(this.query)}
  });
  }


  funcion_general(query:string){
    this.cargando = true;
    this.m2Esc = "";
    this.medioEsc = "";
    this.numVivVent = "";
    this.numVivAlq = "";
    this.tweets= "";
    this.resultadoEsc = 0;

    this.service.servicio_busqueda(query).subscribe(data => {


      //Sentimiento de odio
      console.log(data.porcentaje_odio);
      this.resultadoEsc = <number><unknown>data.porcentaje_odio;
      var no_odio=1-this.resultadoEsc;
      this.chart_odio(this.resultadoEsc,no_odio);


      //Precio medio y M2
      console.log(data.precio_m2);
      console.log(data.precio_viviendas);
      this.m2Esc = data.precio_m2 + " €/m2";
      this.medioEsc = data.precio_viviendas+ " €";

      //Viviendas alquiler y venta
      console.log(data.num_viviendas_venta);
      console.log(data.num_viviendas_alquiler);
      this.numVivVent = data.num_viviendas_venta;
      this.numVivAlq = data.num_viviendas_alquiler;

      //Los restaurantes tienen tres array de string: nombre, puntuacion, etiquetas
      //Guardamos las variables con los string
      var nombres=data.nombre;
      var valoraciones=data.puntuacion;
      var etiquetas=data.etiquetas;

      //castear a un array de strings
      this.nombresRestaurantes=nombres.split("::"); //ahora recibimos un string y los nombres vienen delimitados por :: en vez de ,
      this.valoracionesRestaurantes=valoraciones.split("::");
      this.etiquetasRestaurantes=etiquetas.split("::");
      console.log(this.nombresRestaurantes);
      console.log(this.valoracionesRestaurantes);
      console.log(this.etiquetasRestaurantes);

      //Para todos los elementos de los 3 array hacemos la limpieza de los elementos [, ], "
      for(var i=0;i<this.nombresRestaurantes.length;i++){
        this.nombresRestaurantes[i]=this.nombresRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
        this.valoracionesRestaurantes[i]=this.valoracionesRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
      }
      for(var i=0;i<this.etiquetasRestaurantes.length;i++){
        this.etiquetasRestaurantes[i]=this.etiquetasRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
      }

      //Convertir array de String de tweets a array de number
      this.tweets= data.ultimos_100;
      this.tweets=String(this.tweets).replace('"', '').replace('[', '').replace(']', '');  //Quitamos todos los elementos del array " ] [
      var tweets_number_array = <Array<number>><unknown>this.tweets.split(","); //Convertimos la variable con el string en un array de number al castear

      console.log("holaaa")

      //Generamos la gráfica de tweets
      this.chart_tweets(tweets_number_array);
      console.log(this.myLineChart);


      //todo cargado cambiamos ruleta carga por datos
      this.cargando = false;
    });
  }
//CHARTS

//CHART 2
chart_tweets(tweets: Number[]){
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
        data: tweets, //Los datos los coge de los tweets
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
        y:{
          //min: -1,
          //max: 1,
        },
        xAxes: {
          time: {
            //unit: "minute"
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

chart_odio(odio: number, no_odio: number){
  var myPieChart = new Chart("myPieChart", {
    type: 'doughnut',
    data: {
      labels: ["Odio"],
      datasets: [{
        data: [odio,no_odio],
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
    },
  });
}

}
