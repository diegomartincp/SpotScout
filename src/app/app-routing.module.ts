import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AccederComponent } from './acceder/acceder.component';
import { LoginComponent } from './login/login.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AdministracionCacheComponent } from './administracion-cache/administracion-cache.component';
import { AdministracionQueryComponent } from './administracion-query/administracion-query.component';
import { AdministracionValidacionComponent } from './administracion-validacion/administracion-validacion.component';
import { AdministracionModificarBBDDComponent } from './administracion-modificar-bbdd/administracion-modificar-bbdd.component';
import { AdministracionGraficoBusquedasComponent } from './administracion-grafico-busquedas/administracion-grafico-busquedas.component';


//const routes: Routes = [];
const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'acceso', component: AccederComponent },
  { path: 'login', component: LoginComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: 'busqueda/:query', component: BusquedaComponent },
  { path: 'admin', component: AdministracionComponent },
  { path: 'admin_cache', component: AdministracionCacheComponent },
  { path: 'admin_query', component: AdministracionQueryComponent },
  { path: 'admin_validacion', component: AdministracionValidacionComponent },
  { path: 'admin_modificacionBBDD', component: AdministracionModificarBBDDComponent },
  { path: 'admin_grafica_busquedas', component: AdministracionGraficoBusquedasComponent },
  { path: '**',   redirectTo: '/index', pathMatch: 'full' }, //REDIRIGIR A INDEX
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
