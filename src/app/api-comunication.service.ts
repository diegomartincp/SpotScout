import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";  //Importamos HttpClient para la llamada a la api

import { API_RETURN } from './interfaces/API_RETURN'; //Importamos el objeto API_RETURN que no es mas que un objeto que define la estructura de lo devuielto por la API
import { login_return} from './interfaces/login_return';
import { busqueda } from './interfaces/bbdd';

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

servicio_restaurantes(query:string) : Observable<API_RETURN>{
  let ciudad = query.replace(" ","+")
  let path ='http://127.0.0.1:8000/api/restaurantes/?ciudad='+ciudad
  console.log(path)
  return this.servicio_api.get<API_RETURN>(path)
}
/*
servicio_registro_user(nombre_usuario:string, correo:string, contrasena:string, tipo_user:string) : Observable<API_RETURN>{
  let path ='http://127.0.0.1:8000/api/registro_usuario/?nombre_user='+nombre_usuario+'&correo='+correo+'&contrasena='+contrasena+'&tipo_user='+tipo_user
  console.log(path)
  return this.servicio_api.get<API_RETURN>(path)
}
*/
//EL LOGIN UTILIZA POST
servicio_login_user(correo:string, contrasena:string) : Observable<login_return>{
  const url = 'http://127.0.0.1:8000/api/login'; //La url de la api
  const body = { email: correo, password: contrasena }; //El cuerpo del JSON que se envía a la API
  console.log(body)
  return this.servicio_api.post<login_return>(url,body)
}
servicio_registro_user(nombre:string, correo:string, contrasena: string) : Observable<login_return>{
  const url = 'http://127.0.0.1:8000/api/register'; //La url de la api
  const body = { name: nombre, email: correo, password: contrasena }; //El cuerpo del JSON que se envía a la API
  console.log(body)
  return this.servicio_api.post<login_return>(url,body)
}

//Busqueda
servicio_busqueda(query:string) : Observable<API_RETURN>{
  let ciudad = query.replace(" ","+")
  console.log(ciudad)
  let path ='http://127.0.0.1:8000/api/bbdd/?ciudad='+ciudad;
  console.log(path)

  return this.servicio_api.get<API_RETURN>(path)
}
servicio_comprobar_ciudad(query:string) : Observable<any>{
  let ciudad = query.replace(" ","%20")
  console.log(ciudad)
  let path ='https://www.fotocasa.es/indice-precio-vivienda/ac/'+ciudad;
  console.log(path)
  return this.servicio_api.get<any>(path)
}



//Servicios del administrador
servicio_select_busquedas() : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);

  let path ='http://127.0.0.1:8000/api/select_busquedas'
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_select_cache() : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);

  let path ='http://127.0.0.1:8000/api/select_cache'
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}
servicio_select_grafico_busquedas() : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);

  let path ='http://127.0.0.1:8000/api/graficos_busquedas'
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_select_query(query:string) : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);
  let path ='http://127.0.0.1:8000/api/select_query/?query='+query
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_select_user() : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);

  let path ='http://127.0.0.1:8000/api/select_usuarios'
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_update_user_validar(id:number) : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);
  let path ='http://127.0.0.1:8000/api/update_user_validar/?id='+id
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_select_numero_tweets() : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);
  let path ='http://127.0.0.1:8000/api/select_ultimos_Tweets'
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

servicio_cambiar_numero_tweets(cantidad:number) : Observable<busqueda>{
  const token_ = localStorage.getItem('token');
  const headers = { 'Authorization': 'Bearer '+token_}
  console.log(headers);
  let path ='http://127.0.0.1:8000/api/modificar_ultimos_Tweets?numero_tweets='+cantidad
  console.log(path)
  return this.servicio_api.get<busqueda>(path,{ headers })
}

}
