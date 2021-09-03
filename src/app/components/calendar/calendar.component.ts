import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarDay } from '../../models/CalendarDay';
import { Event } from '../../models/Event';
import { Cuadrante } from '../../models/Cuadrante';
import { CalendarService } from 'src/app/services/calendar.service';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {


  public cabeceras = ["L", "M", "X", "J", "V", "S", "D"];
  public month = Array.from(Array(6), () => new Array(7));
  public today = new Date();

  public weeks = [0, 1, 2, 3, 4, 5];
  public calcMonth;

  public selected: CalendarDay;

  public events: Map<string,Array<Event>> = new Map<string,Array<Event>>();

  public cuadrante: Cuadrante = null;
  public diasCuadrante: [];

  private suscripcion: Subscription;

  constructor(
    private navCtrl:NavController,
    public calendarService: CalendarService
    ) {
      
  }

  async ngOnInit() {
    await this.loadData();
        
    this.suscripcion = this.calendarService.autoRefresh().subscribe(cuad => {
      this.cuadrante = cuad;
      this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, this.cuadrante);
    });

    
    this.calcMonth = this.today;
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, this.cuadrante);
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  async loadData() {
    await this.calendarService.loadCuadranteList();
    await this.calendarService.loadEventMap();
    this.cuadrante = this.calendarService.getActiveCuadrante();    
    this.events = this.calendarService.getEventMap();    
  }

  async refreshCalendar(event) {
    await this.loadData();
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, this.cuadrante);
    event.target.complete();
  }

  selectDay(day) {
    if (day.style != "disabled") {
      if (this.selected) {
        this.selected.selected = "";
      }
      this.selected = day;
      this.selected.selected = "selected";
      this.calendarService.selectedDay = day;
    }

  }

  nextMonth() {
    this.calcMonth = new Date(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, 1);
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, this.cuadrante);

  }

  prevMonth() {
    this.calcMonth = new Date(this.calcMonth.getFullYear(), this.calcMonth.getMonth() - 1, 1);
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, this.cuadrante);
  }

  newEvent() {
    this.navCtrl.navigateForward('/add-event');
  }
  editEvent(editEvent){
    this.calendarService.setEditEvent(editEvent);
    this.navCtrl.navigateForward('/add-event');
  }
  deleteEvent(delEvent) {
    this.calendarService.deleteEvent(delEvent);
  }

  monthCalculate(year, month, cuadrante) {

    const firstDay = new Date(year, month - 1, 1);
    var monthDays = Array.from(Array(6), () => new Array(7))
    var aux = firstDay.getDay() - 1;
    if (aux == -1) aux = 6;
    const firstDayOfWeek = new Date(year, month - 1, 1 - aux);

    var turnDays = [];

    if (cuadrante != null) {
      turnDays = this.generateCuadranteDays(cuadrante, firstDayOfWeek);
    }

    var j = 0;
    var k = 0;
    for (let i = 0; i < 42; i++) {
      monthDays[j][k] = new CalendarDay(new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i));
      
      if (
        monthDays[j][k].day.getFullYear() == this.today.getFullYear() &&
        monthDays[j][k].day.getMonth() == this.today.getMonth() &&
        monthDays[j][k].day.getDate() == this.today.getDate()
      ) {
        monthDays[j][k].style = "today";
        this.selected = monthDays[j][k];
        this.calendarService.selectedDay = this.selected;
      }

      if (monthDays[j][k].day.getMonth() != month - 1) {
        monthDays[j][k].style = "disabled";
      }

      if (cuadrante != null) {
        monthDays[j][k].turn = turnDays[i].turn;
      }

      const dayEvent = new Date(monthDays[j][k].day.getFullYear(),monthDays[j][k].day.getMonth(),monthDays[j][k].day.getDate()).toString();
      monthDays[j][k].events = this.events.get(dayEvent);
      if(monthDays[j][k].events == null){
        monthDays[j][k].events = new Array<Event>();
      }else{
        for(let event of monthDays[j][k].events){
          if(event.turn != null){
            monthDays[j][k].turn = event.turn;
          }
        }
      }

      k++;
      if (k == 7) {
        k = 0;
        j++;
      }
    }
    return monthDays;
  }

  generateCuadranteDays(cuadrante, firstDay) {
    const iterations = Math.trunc(84 / cuadrante.length) + 1;
    var newStart = new Date(cuadrante.startDay);

    if (newStart < firstDay) {
      while (newStart <= firstDay) {
        newStart = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + cuadrante.length);
      }
      newStart = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() - cuadrante.length);
    } else {
      while (newStart > firstDay) {
        newStart = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() - cuadrante.length);
      }
    }

    var index = 0;
    var days = [];
    for (let i = 0; i < iterations; i++) {
      for (let turn of cuadrante.turns) {
        for (let j = 0; j < turn.days; j++) {
          if (days.length == 42) return days;
          var date = new Date(newStart.getFullYear(), newStart.getMonth(), newStart.getDate() + index);
          if (date >= firstDay) {
            var day = new CalendarDay(date);
            day.turn = turn;
            days.push(day);
          }
          index++;
        }
      }
    }
    return days;
  }
}

