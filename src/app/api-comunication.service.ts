import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { API_RETURN } from './interfaces/API_RETURN'; //Importamos el objeto Task que no es mas que un objeto que define la estructura de lo devuielto por la API
import { Observable } from 'rxjs';  //Para emplear el objeto observable


@Injectable({
  providedIn: 'root'
})

export class ApiComunicationService {
valor="";
constructor(private servicio_api:HttpClient) {

}

//Pedimos el resultado a la API
async get_resultado_api(texto_a_analizar:string) : Promise<Observable<API_RETURN>>{
  const url = 'http://127.0.0.1:5000/api/analizar'; //La url de la api
  const body = { texto: texto_a_analizar }; //El cuerpo del JSON que se envía a la API

  return this.servicio_api.post<API_RETURN>(url,body) //Devolvemos el elemento devuelto por la API de tipo TASK
}

}
