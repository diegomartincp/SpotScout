import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiComunicationService {

constructor() { }

//Aquí coge el resultado
get_resultado(){

  return "0.5";
}
devolver_lo_mismo(texto_random:string){
  return "Servicio -> "+texto_random
}

}
