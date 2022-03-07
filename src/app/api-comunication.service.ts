import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ApiComunicationService {
valor="";
constructor(private servicio_api:HttpClient) {

}

//Pedimos el resultado a la API
get_sentimiento(texto_a_analizar:string){
  const body = { texto: texto_a_analizar }; //El cuerpo del JSON que se envía a la API

  this.servicio_api.post<any>("http://127.0.0.1:5000/api/analizar",body).toPromise().then((data:any) => { //.subscribe hace que quede pendiente la comunicación pero se siga ejecutando lo demás
  console.log(data.resultado)
  return data.resultado; //Con data.resultado almacenamos SOLO el valor del resultado
  });
}

}


