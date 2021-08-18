import { Component, OnInit } from '@angular/core';
import { Turn } from 'src/app/models/Turn';
import { Cuadrante } from 'src/app/models/Cuadrante';
import { CalendarService } from 'src/app/services/calendar.service';
import { TurnosComponent } from '../turnos/turnos.component';

@Component({
  selector: 'app-cuadrante',
  templateUrl: './cuadrante.component.html',
  styleUrls: ['./cuadrante.component.scss'],
})
export class CuadranteComponent implements OnInit {

  public cuadrantes: Array<Cuadrante>;
  public isNew = false;
  public newCuadrante: Cuadrante;
  public isAddTurn = false;
  public days:number = null;
  public turn: Turn = new Turn();
  public turns:Array<Turn>;
  public startDate;

  constructor(
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.cuadrantes = this.calendarService.getCuadranteList();
    this.turns = this.calendarService.getTurnList();
  }

  loadCuadranteList(event) {
    this.cuadrantes = this.calendarService.getCuadranteList();
    event.target.complete();
  }

  addCuadrante() {    
    this.newCuadrante = new Cuadrante(new Date(), 0, []);
    this.isNew = true;

  }

  addTurn() {
    this.newCuadrante.turns.push(new Turn(this.turn, this.days));
    this.turn = new Turn();
    this.days = null;
    this.isAddTurn = false;
  }
  reorderItems(ev) {
    const itemMove = this.newCuadrante.turns.splice(ev.detail.from, 1)[0];
    this.newCuadrante.turns.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
}

  clickSave() {
    this.newCuadrante.startDay = new Date(this.startDate);
    
    var aux = 0;
    for(let turno of this.newCuadrante.turns){
      aux += turno.days;
    }
    this.newCuadrante.length = aux;
    this.calendarService.saveCuadrante(this.newCuadrante);
    this.isNew = false;
  }
  clickDelete(cuadrante) {
    this.calendarService.deleteCuadrante(cuadrante);
    this.cuadrantes = this.calendarService.getCuadranteList();
  }

  updateCuadrante() {
    this.calendarService.updateCuadrante();
  }

  cuadranteActivation(cuadrante) {

    this.calendarService.setNewActiveCuadrante(cuadrante);
    this.cuadrantes = this.calendarService.getCuadranteList();
  }
}
