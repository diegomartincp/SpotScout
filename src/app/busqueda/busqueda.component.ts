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

  tweets:string = "";

  nombresRestaurantes : string[] = [];
  valoracionesRestaurantes : string[] = [];
  etiquetasRestaurantes : string[] = [];

  imagen = "../assets/images/experience.png";
  resultadoEsc = "0";
  m2Esc = "0";
  medioEsc = "0";
  tweets_test=[];
  //tweets_test=[0.0258,0,0.8402,0.8402,0.8402,-0.2732,0.4767,0,0,0,0,0,0,0.4767,0.4767,-0.8225,0,0,0,0.4767,0.4767,0.4767,0.4767,0,0.4497,0,0,0,0.807,0,0,0.4019,0.5267,0.5267,0.3818,0.7096,-0.4215,0,0.3182,-0.1655,0.4019,0,0.4019,0,0,0.6249,0.7787,-0.3182,0.3182,0,0,0,0,0,0,0.6833,0.5719,0,0.3182,0,0.5423,0.8172,0,0.3182,0.5423,0.5423,0,0,-0.1779,0.3818,0.4019,-0.2263,0.5423,-0.2263,-0.2263,0,0.4019,0,-0.0516,-0.0516,-0.0516,0.7096,0,0,0,0,0,0,0,0.3818,0,0.3612,0,0.7096,0,0,-0.5994,0.5501,0,-0.0258];
  query:any=""
  constructor(
    public service: ApiComunicationService,
    private _Activatedroute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    //var tweets_funcion=[0,-0.6705,0.9055,0.765,0.8481,0,0,0,0,0,0,0,0.6486,0,0.7096,0.891,0,0,0.6908,0,0.347,-0.802,0,0.5719,0,0,0,0.8674,0.4215,0.749,-0.802,0.7184,0.7184,0.2732,0,0.9439,0,0,0.5719,0.7184,0,0.3818,0,0,0.0772,-0.6597,0,0,0.4767,0,-0.3612,0,0,-0.3612,0,0,0,0,0.5267,0.9231,0.5267,0,0,0.7964,0.8442,0.8442,0.6249,0.4019,0,0.6249,0.0772,0.4215,0.7156,0,0,0,-0.296,0,0.9094,0.9094,0,0,0,0,0.2235,0,0,-0.4215,0.0258,0,0.765,0,0,0.875,0.4019,0.4019,0.128,0.128,0.4767,0.4019];
    //this.chart2(tweets_funcion);

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

      //Los restaurantes tienen tres array de string: nombre, puntuacion, etiquetas

      //this.nombresResEsc = data.nombre;
      //this.valoracionResEsc = data.puntuacion;
      //this.etiquetasResEsc = data.etiquetas;

      //Guardamos las variables con los string
      var nombres=data.nombre;
      var valoraciones=data.puntuacion;
      var etiquetas=data.etiquetas;
      //Eliminamos los elementos del array [ " ]
      //var nombres=nombres.replace('"', '').replace('[', '').replace(']', '');
      //var valoraciones=valoraciones.replace('"', '').replace('[', '').replace(']', '');
      //var etiquetas=etiquetas.replace('"', '').replace('[', '').replace(']', '');
      console.log(nombres);
      //Ahora que lo tenemos limpio podemos castear a un array de strings
      this.nombresRestaurantes=nombres.split(",");
      this.valoracionesRestaurantes=valoraciones.split(",");
      this.etiquetasRestaurantes=etiquetas.split(",");
      console.log(this.nombresRestaurantes);
      console.log(this.valoracionesRestaurantes);
      console.log(this.etiquetasRestaurantes);
      //Para todos los elementos de los 3 array hacemos
      for(var i=0;i<this.nombresRestaurantes.length;i++){
        this.nombresRestaurantes[i]=this.nombresRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
        this.valoracionesRestaurantes[i]=this.valoracionesRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
        //this.etiquetasRestaurantes[i]=this.etiquetasRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
      }
      for(var i=0;i<this.etiquetasRestaurantes.length;i++){
        this.etiquetasRestaurantes[i]=this.etiquetasRestaurantes[i].replace('"', '').replace('"', '').replace('[', '').replace(']', '')
      }

      //Convertir array de String de tweets a array de number
      this.tweets= data.ultimos_100;
      this.tweets=String(this.tweets).replace('"', '').replace('[', '').replace(']', '');  //Quitamos todos los elementos del array " ] [
      var tweets_number_array = <Array<number>><unknown>this.tweets.split(","); //Convertimos la variable con el string en un array de number al castear
      //Generamos la gráfica
      this.chart2(tweets_number_array);
    });
  }
//CHARTS

//CHART 2
chart2(tweets: Number[]){
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

}
