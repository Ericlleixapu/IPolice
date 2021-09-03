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
      { path: 'calendar', component: CalendarComponent },
      { path: 'cuadrantes', component: CuadranteComponent },
      { path: 'turnos', component: TurnosComponent },
      
      {
        path: '',
        redirectTo: '/calendario/calendar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule { }
