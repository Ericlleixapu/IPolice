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
  public isEdit = false;
  public newCuadrante: Cuadrante;
  public isAddTurn = false;
  public days: number = null;
  public turn: Turn = new Turn();
  public turns: Array<Turn>;
  public startDate;
  public formOk: boolean = false;
  public formTurnOk: boolean = false;

  constructor(
    private calendarService: CalendarService) { }

  ngOnInit() {
    this.cuadrantes = this.calendarService.getCuadranteList();
    this.turns = this.calendarService.getTurnList();
  }

  loadCuadranteList(event) {
    this.turns = this.calendarService.getTurnList();
    this.cuadrantes = this.calendarService.getCuadranteList();
    event.target.complete();
  }

  addCuadrante() {
    this.newCuadrante = new Cuadrante(new Date(), 0, []);
    this.isNew = true;
    this.formOk = false;

  }

  addTurn() {
    this.newCuadrante.turns.push(new Turn(this.turn, this.days));
    this.turn = new Turn();
    this.days = null;
    this.isAddTurn = false;
    this.formTurnOk = false;
    this.formControl();
  }
  reorderItems(ev) {
    const itemMove = this.newCuadrante.turns.splice(ev.detail.from, 1)[0];
    this.newCuadrante.turns.splice(ev.detail.to, 0, itemMove);
    ev.detail.complete();
  }

  clickSave() {
    this.newCuadrante.startDay = new Date(this.startDate);

    var aux = 0;
    for (let turno of this.newCuadrante.turns) {
      aux += turno.days;
    }
    this.newCuadrante.length = aux;
    this.calendarService.saveCuadrante(this.newCuadrante);
    this.isNew = false;
  }
  clickSaveEdit() {
    this.newCuadrante.startDay = new Date(this.startDate);

    var aux = 0;
    for (let turno of this.newCuadrante.turns) {
      aux += turno.days;
    }
    this.newCuadrante.length = aux;
    this.calendarService.updateCuadrante();
    this.isEdit = false;
  }
  clickDelete(cuadrante) {
    this.calendarService.deleteCuadrante(cuadrante);
    this.cuadrantes = this.calendarService.getCuadranteList();
  }

  updateCuadrante() {
    this.calendarService.updateCuadrante();
  }

  async cuadranteActivation(cuadrante) {
    await new Promise(function (resolve) { setTimeout(resolve, 2) });
    this.calendarService.setNewActiveCuadrante(cuadrante);
    this.cuadrantes = this.calendarService.getCuadranteList();
  }

  clickDeleteTurn(turn) {
    let aux = this.newCuadrante.turns.indexOf(turn);
    if (aux != null) {
      this.newCuadrante.turns.splice(aux, 1);
    }
  }

  clickEdit(cuadrante: Cuadrante) {
    this.newCuadrante = cuadrante;
    this.startDate = cuadrante.startDay.toISOString();
    this.isEdit = true;
  }

  formTurnControl() {
    this.formTurnOk = true;
    if (this.turn.title == "") {
      this.formTurnOk = false;
    }
    if (this.days == null) {
      this.formTurnOk = false;
    }
    if (this.days <= 0) {
      this.formTurnOk = false;
    }
  }

  formControl() {
    this.formOk = true;
    if (this.newCuadrante.name == "") {
      this.formOk = false;
    }
    if (this.startDate == null) {
      this.formOk = false;
    }
    if (this.newCuadrante.turns.length <= 0) {
      this.formOk = false;
    }
  }
}
