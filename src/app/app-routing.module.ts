import { AgendaEditarComponent } from './agenda-editar/agenda-editar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  { path: 'agenda/novo', component: AgendaEditarComponent },
  { path: 'agenda/editar/:id', component: AgendaEditarComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home',  pathMatch: 'full'  } 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
