import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiComunicationService } from './api-comunication.service'; //Importamos el servicio

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { SentimientoComponent } from './sentimiento/sentimiento.component';
import{ HttpClientModule } from '@angular/common/http';//

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    IndexComponent,
    SentimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiComunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
