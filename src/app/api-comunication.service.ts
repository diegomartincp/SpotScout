import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiComunicationService {

constructor(private servicio_api:HttpClient) {

}

//Aquí coge el resultado
get_resultado(){

  return "0.5";
}
devolver_lo_mismo(texto_random:string){
  this.servicio_api.post("http://127.0.0.1:5000/analizar",{texto:"no me gusta esto"}).subscribe(data => { //.subscribe hace que quede pendiente la comunicación pero se siga ejecutando lo demás
  console.log(data)
  //console.log(JSON.stringify(data.json))
  });

  return "Servicio -> "+texto_random
}

}
