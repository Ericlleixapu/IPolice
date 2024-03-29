import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Turn } from '../../models/Turn';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {

  public isNew:boolean = false;
  public isEdit:boolean = false;
  public turns: Array<Turn>;
  public newTurn: Turn;
  public formOk:boolean = false;

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

    this.calendarService.saveTurn(turn);
  }

  clickDelete(turn) {
    this.calendarService.deleteTurn(turn);
  }

  clickEdit(turn) {
    this.isEdit = false;
    this.newTurn = turn;
  }

  formControl(){
    this.formOk = true;
    if(this.newTurn.title == ""){
      this.formOk = false;
    }
    if(this.newTurn.description == ""){
      this.formOk = false;
    }
    if(this.newTurn.startTime == null){
      this.formOk = false;
    }
    if(this.newTurn.finalTime == null){
      this.formOk = false;
    }
    
  }

}
