import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  //Importamos HttpClient para la llamada a la api

import { API_RETURN } from './interfaces/API_RETURN'; //Importamos el objeto API_RETURN que no es mas que un objeto que define la estructura de lo devuielto por la API
import { Observable } from 'rxjs';  //Para emplear el objeto observable
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiComunicationService {
//Aquí había una errata con una variable "valor" no utilizada
constructor(private servicio_api:HttpClient) {  //Inyectar la libreria para el servicio de la api

}
/*
//Pedimos el resultado a la API
get_resultado_api(texto_a_analizar:string) : Observable<API_RETURN>{
  const apiUrl = environment.api_url;

  const url = apiUrl+'api/analizar'; //La url de la api
  const body = { texto: texto_a_analizar }; //El cuerpo del JSON que se envía a la API

  return this.servicio_api.post<API_RETURN>(url,body) //Devolvemos el elemento devuelto por la API de tipo TASK
} //Esta funciones del servicio http es de tipo OBSERVABLE!
*/
servicio_delito_odio(query:string): Observable<API_RETURN>{
  let ciudad = query.replace(" ","+")
  let path ='http://127.0.0.1:8000/api/noticias/?ciudad='+ciudad
  console.log(path)
  return this.servicio_api.get<API_RETURN>(path)
}

servicio_precio(query:string) : Observable<API_RETURN>{
  let ciudad = query.replace(" ","+")
  let path ='http://127.0.0.1:8000/api/precio/?ciudad='+ciudad
  console.log(path)
  return this.servicio_api.get<API_RETURN>(path)
}

}
