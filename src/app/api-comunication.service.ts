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

}
