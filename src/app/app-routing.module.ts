import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SentimientoComponent } from './sentimiento/sentimiento.component';

//const routes: Routes = [];
const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'sentimiento', component: SentimientoComponent },
  { path: '**',   redirectTo: '/index', pathMatch: 'full' }, //REDIRIGIR A INDEX
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
