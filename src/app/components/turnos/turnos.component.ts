import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Turn } from '../../models/Turn';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {

  public isNew = false;
  public turns: Array<Turn>;
  public newTurn: Turn;
  public startTime;
  public finalTime;

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.turns = this.calendarService.getTurnList();
  }

  addTurn() {
    this.newTurn = new Turn();
    this.isNew = true;
  }

  loadTurnList(event) {
    this.turns = this.calendarService.getTurnList();
    event.target.complete();
  }

  clickSave(turn) {
    this.isNew = false;

    var aux = new Date(this.startTime);
    turn.startTime = aux.getHours() + ":" + aux.getMinutes()
    console.log(aux);

    aux = new Date(this.finalTime);
    turn.finalTime = aux.getHours() + ":" + aux.getMinutes()

    this.calendarService.saveTurn(turn);

  }

  clickDelete(turn) {
    this.calendarService.deleteTurn(turn);
  }

  clickEdit(turn) {
    this.newTurn = turn;
  }

}
