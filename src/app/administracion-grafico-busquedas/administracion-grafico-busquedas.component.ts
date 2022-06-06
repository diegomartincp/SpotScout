import { Component, OnInit } from '@angular/core';
import { ApiComunicationService } from '../api-comunication.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-administracion-grafico-busquedas',
  templateUrl: './administracion-grafico-busquedas.component.html',
  styleUrls: ['./administracion-grafico-busquedas.component.scss']
})
export class AdministracionGraficoBusquedasComponent implements OnInit {

  constructor(public service: ApiComunicationService) { }
  array=[]

  myLineChart: any;
  grafica1:string ="";

  nombre=[]
  cantidad=[]
  ngOnInit(): void {
    const data = this.service.servicio_select_grafico_busquedas().subscribe((data) => {
      this.array = JSON.parse(JSON.stringify(data));

      for(var i=0; i<this.array.length; i++){
        this.nombre[i] = this.array[i]['query']
        this.cantidad[i] = this.array[i]['cantidad']
      }
      this.chart_cache(this.nombre, this.cantidad)
      //pasar a dos arrays
    });
  }

  chart_cache(nombre: String[], cantidad: Number[]){
    //array con querys
    this.myLineChart = new Chart("myBarChart", {
      type: 'bar',
      data: {
        labels: nombre,
        datasets: [{
          label: "Cantidad de Busquedas",

          backgroundColor: "rgba(78, 115, 223, 1)",
          borderColor: "rgba(78, 115, 223, 1)",
          //aqui le paso numero cantidad
          data: cantidad, //Los datos los coge de los tweets
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
        }

      }
    })
  }

}
