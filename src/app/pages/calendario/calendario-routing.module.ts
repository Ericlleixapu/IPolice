import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { CuadranteComponent } from 'src/app/components/cuadrante/cuadrante.component';
import { TurnosComponent } from 'src/app/components/turnos/turnos.component';

import { CalendarioPage } from './calendario.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarioPage,
    children: [
      { path: 'tab1', component: CalendarComponent },
      { path: 'tab2', component: CuadranteComponent },
      { path: 'tab3', component: TurnosComponent },
      {
        path: '',
        redirectTo: '/calendario/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/calendario/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule { }
