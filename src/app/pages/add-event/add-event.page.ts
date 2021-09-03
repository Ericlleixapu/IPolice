import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarDay } from 'src/app/models/CalendarDay';
import { Event } from 'src/app/models/Event';
import { Turn } from 'src/app/models/Turn';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  public event: Event;
  public selectedDay: CalendarDay;
  public turns: Array<Turn>;
  public turn: Turn = new Turn();
  public isNew: boolean = false;
  public formOk:boolean = false;
  public fecha:string;

  constructor(
    private navCtrl: NavController,
    public calendarService: CalendarService
  ) {     
  }

  ngOnInit() {
    this.turns = this.calendarService.getTurnList();
    this.selectedDay = this.calendarService.selectedDay;
    this.event = this.calendarService.getEditEvent();
    if (this.event == null) {
      this.isNew = true;
      this.event = new Event();
      this.event.day = new Date(this.selectedDay.day.getUTCFullYear(), this.selectedDay.day.getMonth(), this.selectedDay.day.getDate());
    }    
    this.event.day.toISOString();
    this.formControl();
  }

  getBack() {
    this.navCtrl.navigateBack('/calendario/calendar');
  }
  saveEvent() {
    if (this.event.title == "") {
      this.event.title = "Nuevo Evento";
    }
    this.calendarService.saveEvent(this.event);
    if (this.event.type == "turn") {
      this.event.startTime = this.event.turn.startTime;
      this.event.finalTime = this.event.turn.finalTime;
    }
    this.getBack();
  }
  deleteEvent() {
    this.calendarService.deleteEvent(this.event);
    this.getBack();
  }
  updateEvent() {
    this.calendarService.updateEvent();
    this.getBack();
  }
  formControl(){
    this.formOk = true;
    if(this.event.type == "turn" && this.event.turn == null){
      this.formOk = false;
    }
  }
}
