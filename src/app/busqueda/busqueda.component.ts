import { Component, OnInit } from '@angular/core';
import { EMPTY, empty, NEVER } from 'rxjs';
import { ApiComunicationService } from '../api-comunication.service'; //Importamos el servicio
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import Swal from "sweetalert2"
import { Router } from '@angular/router';

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
  imagenesRestaurantes : string[] = ["imagenRestaurante1.jpg","imagenRestaurante2.jpg","imagenRestaurante3.jpg","imagenRestaurante4.jpg","imagenRestaurante5.jpg","imagenRestaurante6.jpg","imagenRestaurante7.jpg","imagenRestaurante8.jpg","imagenRestaurante9.jpg","imagenRestaurante10.jpg"];

  resultadoEsc = 0;

  m2Esc = "";
  medioEsc = "";

  query:any=""
  ciudad:string="";

  myLineChart: any;
  myPieChart:any;
  cargando: boolean = true;

  tweetsListo: boolean =false;
  grafica1:string ="";
  tamano=8
  mostrar='hidden'

  constructor(
    public service: ApiComunicationService,
    private _Activatedroute:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.chart_odio();
    this.imagenesRestaurantes.sort(()=> Math.random() - 0.5);
    this.cargando=false;
    this._Activatedroute.paramMap.subscribe(params => {
      this.query = params.get('query');
     // console.log(this.query);
      this.ciudad=this.query;
      if(this.query){this.funcion_general(this.query)}
    });
  }

  funcion_general(query:string){
    console.log("una vez")
    history.pushState(null, "", "busqueda/"+query);
    this.mostrar='visible'
    this.tamano = 8
    this.ciudad=query;


    //comprobamos el nombre

    this.service.servicio_comprobar_ciudad(query).subscribe(data => {
      console.log("api de comprobacion")
      if(data.length == 0){
        console.log(" no existe ")
        Swal.close()
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La ciudad no es valida',
        });
        this.router.navigate(['/busqueda']);
        return;
      }else{

        Swal.fire({
          title: 'Realizando la busqueda en '+data[0]['label'],
          icon: 'info',
          html:
            "<div class='spinner-border float-right text-primary' style='margin: 5px' role='status'></div>"
        })

        this.m2Esc = "";
        this.medioEsc = "";
        this.numVivVent = "";
        this.numVivAlq = "";
        this.tweets= "";
        this.resultadoEsc = 0;
        this.service.servicio_busqueda(query).subscribe(data => {
          console.log("api de busqueda")

          if (this.myLineChart) this.myLineChart.destroy(); //destroy del chart
          if (this.myPieChart) this.myPieChart.destroy(); //destroy del chart


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

          //Generamos la gráfica de tweets
          this.grafica1 = '<canvas id="myAreaChart"></canvas>'
          this.chart_tweets(tweets_number_array);
          console.log("    aaaa    "+tweets_number_array)
          //todo cargado cambiamos ruleta carga por datos
          this.tamano = 0
          Swal.close()

        });
      }

    });





  }
//CHARTS

//CHART 2
chart_tweets(tweets: Number[]){
  var labels_=Array.from(Array(tweets.length).keys());
  //console.log(tweets.length)

  this.myLineChart = new Chart("myAreaChart", {
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
  this.tweetsListo = true;

}

chart_odio(odio: number, no_odio: number){
  this.myPieChart = new Chart("myPieChart", {
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
