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

  public typeEvent = Event.typeEvent;
  public typeJuicio = Event.typeJuicio;
  public typeExtra = Event.typeExtra;
  public typeFiesta = Event.typeFiesta;
  public typeAP = Event.typeAP;
  public typeVacaciones = Event.typeVacaciones;
  public typeBaja = Event.typeBaja;

  public event: Event;
  public selectedDay: CalendarDay;
  public turns: Array<Turn>;
  public turn: Turn = new Turn();
  public isNew: boolean = false;
  public formOk: boolean = false;
  public fecha: string;

  constructor(
    private navCtrl: NavController,
    public calendarService: CalendarService
  ) {
  }

  ngOnInit() {
    this.turns = this.calendarService.getTurnList();
    this.selectedDay = this.calendarService.selectedDay;
    this.event = this.calendarService.getEditEvent();
    if (this.event.title == "") {
      this.isNew = true;
    }
    this.formControl();
    this.fecha = this.event.day.toISOString();
  }

  getBack() {
    this.navCtrl.navigateBack('/calendario/calendar');
  }
  saveEvent() {
    if (this.event.title == "") {
      this.event.title = "Nuevo Evento";
    }

    if (this.event.turn != null) {
      this.event.title = this.event.turn.description;
      this.event.startTime = this.event.turn.startTime;
      this.event.finalTime = this.event.turn.finalTime;
    }
    
    this.calendarService.saveEvent(this.event);
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
  formControl() {
    this.formOk = true;

    switch (this.event.type) {
      case Event.typeAP:
        this.event.turn = this.calendarService.APTurn;
        break;
      case Event.typeBaja:
        this.event.turn = this.calendarService.bajaTurn;
        break;
      case Event.typeEvent:
        this.event.turn = null;
        break;
      case Event.typeExtra:
        if (this.event.turn == null) {
          this.formOk = false;
        }
        break;
      case Event.typeFiesta:
        this.event.turn = this.calendarService.fiestaTurn;
        break;
      case Event.typeJuicio:
        this.event.turn = null;
        break;
      case Event.typeVacaciones:
        this.event.turn = this.calendarService.vacacionesTurn;
        break;
      default:
        this.event.turn = null;
    }
  }
}
