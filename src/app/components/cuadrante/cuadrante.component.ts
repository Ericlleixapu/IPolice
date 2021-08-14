import { Component, OnInit } from '@angular/core';
import { Turn } from 'src/app/models/Turn';
import { Cuadrante } from 'src/app/models/Cuadrante';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-cuadrante',
  templateUrl: './cuadrante.component.html',
  styleUrls: ['./cuadrante.component.scss'],
})
export class CuadranteComponent implements OnInit {

  public cuadrantes: Array<Cuadrante>;
  public isNew = false;
  public newCuadrante: Cuadrante;

  constructor(
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.cuadrantes = this.calendarService.getCuadranteList();
  }

  loadCuadranteList(event){
    this.cuadrantes = this.calendarService.getCuadranteList();
    event.target.complete();
  }

  addCuadrante() {
    this.isNew = true;

  }
  clickSave() {
    this.isNew = false;

  }
  clickDelete(cuadrante) {
    this.calendarService.deleteCuadrante(cuadrante);
  }

  updateCuadrante() {
    this.calendarService.updateCuadrante();
  }

  cuadranteActivation(cuadrante){
    this.updateCuadrante();
    if(!cuadrante.isActive) cuadrante = null;
    this.calendarService.autoRefreshCalendar.next(cuadrante);
  }
}
