import { Component } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {

  constructor(
    private calendarService:CalendarService
  ) {}
 
  async ngOnInit() {
    await this.calendarService.loadTurnList();
    await this.calendarService.loadCuadranteList();
    await this.calendarService.loadEventList();
    this.calendarService.initialData();
  }
}
