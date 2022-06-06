import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiComunicationService } from './api-comunication.service'; //Importamos el servicio

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import{ HttpClientModule } from '@angular/common/http';
import { AccederComponent } from './acceder/acceder.component';
import { LoginComponent } from './login/login.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AdministracionCacheComponent } from './administracion-cache/administracion-cache.component';
import { AdministracionQueryComponent } from './administracion-query/administracion-query.component';
import { AdministracionValidacionComponent } from './administracion-validacion/administracion-validacion.component';
import { AdministracionModificarBBDDComponent } from './administracion-modificar-bbdd/administracion-modificar-bbdd.component';
import { AdministracionGraficoBusquedasComponent } from './administracion-grafico-busquedas/administracion-grafico-busquedas.component'; //Se importa la librería para la llamada a la api

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    IndexComponent,
    AccederComponent,
    LoginComponent,
    BusquedaComponent,
    AdministracionComponent,
    AdministracionCacheComponent,
    AdministracionQueryComponent,
    AdministracionValidacionComponent,
    AdministracionModificarBBDDComponent,
    AdministracionGraficoBusquedasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  //Se importa
  ],
  providers: [ApiComunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
