import { Component, OnInit } from '@angular/core';
import { CalendarDay } from '../../models/CalendarDay';
import { Event } from '../../models/Event'
import { Turn } from '../../models/Turn'
import { Cuadrante } from '../../models/Cuadrante'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  public cabeceras = ["L", "M", "X", "J", "V", "S", "D"];
  public month = Array.from(Array(6), () => new Array(7));
  public today = new Date();

  public weeks = [0, 1, 2, 3, 4, 5];
  public calcMonth;

  public selected: CalendarDay;

  public events: Array<Event> = [];

  public cuadrante;
  public diasCuadrante: [];

  constructor() {

  }

  ngOnInit() {

    var turns = [];
    turns.push(new Turn("F", 7));
    turns.push(new Turn("TM", 7));
    turns.push(new Turn("F", 7));
    turns.push(new Turn("TT", 5));
    turns.push(new Turn("F", 2));
    turns.push(new Turn("TN", 7));

    this.cuadrante = new Cuadrante(new Date('2021/7/12'), 35, turns);

    this.calcMonth = this.today;
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1,this.cuadrante);

  }

  selectDay(day) {
    if (day.style != "disabled") {
      if (this.selected) {
        this.selected.selected = "";
      }
      this.selected = day;
      this.selected.selected = "selected";
    }
  }
  nextMonth(slidingItem) {
    slidingItem.close();

    this.calcMonth = new Date(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1, 1);
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1,this.cuadrante);


  }

  prevMonth(slidingItem) {
    slidingItem.close();

    this.calcMonth = new Date(this.calcMonth.getFullYear(), this.calcMonth.getMonth() - 1, 1);
    this.month = this.monthCalculate(this.calcMonth.getFullYear(), this.calcMonth.getMonth() + 1,this.cuadrante);

  }

  monthCalculate(year, month, cuadrante) {

    const firstDay = new Date(year, month - 1, 1);
    var monthDays = Array.from(Array(6), () => new Array(7))
    var aux = firstDay.getDay() - 1;
    if (aux == -1) aux = 6;
    const firstDayOfWeek = new Date(year, month - 1, 1 - aux);

    const turnDays = this.generateCuadranteDays(cuadrante, firstDayOfWeek);

    var j = 0;
    var k = 0;
    for (let i = 0; i < 42; i++) {
      monthDays[j][k] = new CalendarDay(new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate() + i));
      if (monthDays[j][k].day.getMonth() != month - 1) {
        monthDays[j][k].style = "disabled";
      }
      if (monthDays[j][k].day.getDate() == 15) {
        monthDays[j][k].events.push(new Event);
      }
      if (
        monthDays[j][k].day.getFullYear() == this.today.getFullYear() &&
        monthDays[j][k].day.getMonth() == this.today.getMonth() &&
        monthDays[j][k].day.getDate() == this.today.getDate()
      ) {
        monthDays[j][k].style = "today";
      }

        monthDays[j][k].turn = turnDays[i].turn;
      
      k++;
      if (k == 7) {
        k = 0;
        j++;
      }
    }
    return monthDays;
  }
  generateCuadranteDays(cuadrante, firstDay) {
    const iterations = Math.trunc(62 / cuadrante.length) + 1;

    var newStart = new Date(cuadrante.startDay);

    while(newStart > firstDay){
      newStart = new Date(newStart.getFullYear(),newStart.getMonth(),newStart.getDate() - cuadrante.length);
    }
    
    var index = 0;
    var days = [];
    for (let i = 0; i < iterations; i++) {
      for (let turn of cuadrante.turns) {
        for (let j = 0; j < turn.days; j++) {     
          if(days.length == 42) return days;     
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

