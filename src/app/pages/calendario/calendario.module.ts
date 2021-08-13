import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';

import { CalendarioPage } from './calendario.page';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {CuadranteComponent} from '../../components/cuadrante/cuadrante.component';
import {TurnosComponent} from '../../components/turnos/turnos.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [
    CalendarioPage,
    CalendarComponent,
    CuadranteComponent,
    TurnosComponent
  ]
})
export class CalendarioPageModule {}
