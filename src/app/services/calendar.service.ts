import { Injectable } from '@angular/core';
import { Cuadrante } from '../models/Cuadrante';
import { Event } from '../models/Event';
import { Turn } from '../models/Turn';

import { Storage } from '@ionic/storage-angular';
import { Observable, Subject } from 'rxjs';
import { CalendarDay } from '../models/CalendarDay';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public fiestaTurn;
  public APTurn;
  public vacacionesTurn;
  public bajaTurn;

  private cuadranteList: Array<Cuadrante>;
  private turnList: Array<Turn>;
  private eventMap: Map<string, Array<Event>>;
  public selectedDay: CalendarDay;
  private editEvent: Event = null;

  public autoRefreshCalendar: Subject<boolean> = new Subject();

  constructor(private storage: Storage) {

  }

  autoRefresh(): Observable<boolean> {
    return this.autoRefreshCalendar.asObservable();
  }
  //GESTION DE CUADRANTES
  async loadCuadranteList() {
    const data = await this.storage.get("cuadrantes");
    if (data == null) {
      this.cuadranteList = [];
    } else {
      this.cuadranteList = data;
    }
  }
  saveCuadrante(cuadrante) {
    cuadrante.id = Date.now();
    this.cuadranteList.push(cuadrante);
    this.storage.set("cuadrantes", this.cuadranteList);
  }
  getCuadranteList() {
    return this.cuadranteList;
  }
  updateCuadrante() {
    this.storage.set("cuadrantes", this.cuadranteList);

    this.autoRefreshCalendar.next(true);
  }
  deleteCuadrante(cuadrante) {
    let aux = this.cuadranteList.indexOf(cuadrante);
    if (aux != null) {
      this.cuadranteList.splice(aux, 1);
    }
    this.storage.set("cuadrantes", this.cuadranteList);

    this.autoRefreshCalendar.next(true);
  }
  getActiveCuadrante() {
    if (this.cuadranteList.length > 0) {
      for (let cuadrante of this.cuadranteList) {
        if (cuadrante.isActive) return cuadrante;
      }
    }
    return null;
  }

  setNewActiveCuadrante(cuadrante: Cuadrante) {
    const isActive = cuadrante.isActive;

    for (let cuad of this.cuadranteList) {
      cuad.isActive = false;
    }
    cuadrante.isActive = isActive;
    this.updateCuadrante();

  }

  //GESTION DE TURNOS
  async loadTurnList() {
    const data = await this.storage.get("turns");
    if (data == null) {
      this.turnList = [];
    } else {
      this.turnList = data;
      for (let turn of this.turnList) {
        if (turn.description == "Fiesta") {
          this.fiestaTurn = turn;
        }
        if (turn.description == "Vacaciones") {
          this.vacacionesTurn = turn;
        }
        if (turn.description == "Asuntos Personales") {
          this.APTurn = turn;
        }
        if (turn.description == "Baja") {
          this.bajaTurn = turn;
        }
      }
    }
  }

  saveTurn(turn) {
    this.turnList.push(turn);
    this.storage.set("turns", this.turnList);
  }
  getTurnList() {
    return this.turnList;
  }
  updateTurn() {
    this.storage.set("turns", this.turnList);
  }
  deleteTurn(turn) {
    let aux = this.turnList.indexOf(turn);
    if (aux != null) {
      this.turnList.splice(aux, 1);
    }
    this.storage.set("turns", this.turnList);
  }

  //GESTION DE EVENTOS
  async loadEventMap() {
    const data = await this.storage.get("events");
    if (data == null) {
      this.eventMap = new Map<string, Array<Event>>();
    } else {
      this.eventMap = data;
    }
  }
  
  saveEvent(event: Event) {
    let eventsDay = this.eventMap.get(event.day.toString());
    if (eventsDay == null) {
      let aux = [];
      aux.push(event);
      this.eventMap.set(event.day.toString(), aux)
      this.storage.set("events", this.eventMap);
    } else {
      eventsDay.push(event);
      this.storage.set("events", this.eventMap);
    }
    this.autoRefreshCalendar.next(true);
  }
  getEventMap() {
    return this.eventMap;
  }
  updateEvent() {
    this.storage.set("events", this.eventMap);
    this.autoRefreshCalendar.next(true);
  }
  deleteEvent(event: Event) {
    let eventsDay = this.eventMap.get(event.day.toString());
    let aux = eventsDay.indexOf(event);
    if (aux != null) {
      eventsDay.splice(aux, 1);
    }
    this.storage.set("events", this.eventMap);
    this.autoRefreshCalendar.next(true);
  }
  setEditEvent(editEvent) {
    this.editEvent = editEvent;
  }
  getEditEvent(): Event {
    let aux = this.editEvent;
    this.editEvent = null;
    return aux;
  }

  //DATOS INICIALES APP
  initialData() {

    if (this.turnList.length == 0) {
      var aux = new Turn();
      aux.title = "F";
      aux.color = "Sin Color";
      aux.description = "Fiesta";
      aux.startTime = "00:00";
      aux.finalTime = "23:59";
      this.turnList.push(aux);
      this.fiestaTurn = aux;
      this.storage.set("turns", this.turnList);
      aux = new Turn();
      aux.title = "TM";
      aux.color = "paleturquoise";
      aux.description = "Turno de mañana";
      aux.startTime = "06:00";
      aux.finalTime = "14:00";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "M12";
      aux.color = "paleturquoise";
      aux.description = "Turno de mañana 12H";
      aux.startTime = "06:00";
      aux.finalTime = "18:00";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "TT";
      aux.color = "palegoldenrod";
      aux.description = "Turno de Tarde";
      aux.startTime = "14:00";
      aux.finalTime = "22:00";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "TN";
      aux.color = "palevioletred";
      aux.description = "Turno de Noche";
      aux.startTime = "22:00";
      aux.finalTime = "06:00";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "N12";
      aux.color = "palevioletred";
      aux.description = "Turno de noche 12H";
      aux.startTime = "18:00";
      aux.finalTime = "06:00";
      this.turnList.push(aux);
      this.storage.set("turns", this.turnList);
    }

    var fiesta = false;
    var vacaciones = false;
    var ap = false;
    var baja = false;


    for(let turno of this.turnList){
      if(turno.description == "Fiesta"){
        fiesta = true;
      }
      if(turno.description == "Vacaciones"){
        vacaciones = true;
      }
      if(turno.description == "Asuntos Personales"){
        ap = true;
      }
      if(turno.description == "Baja"){
        baja = true;
      }
    }
    
    if (!fiesta) {
      var aux = new Turn();
      aux.title = "F";
      aux.color = "Sin Color";
      aux.description = "Fiesta";
      aux.startTime = "00:00";
      aux.finalTime = "23:59";
      this.turnList.push(aux);
      this.fiestaTurn = aux;
      this.storage.set("turns", this.turnList);
    }

    if (!vacaciones) {
      var aux = new Turn();
        aux.title = "V";
        aux.color = "Sin Color";
        aux.description = "Vacaciones";
        aux.startTime = "00:00";
        aux.finalTime = "23:59";
        aux.isHidden = true;
        this.turnList.push(aux);
        this.vacacionesTurn = aux;
        this.storage.set("turns", this.turnList);
      }
      
      if (!ap) {
        var aux = new Turn();
        aux.title = "AP";
        aux.color = "Sin Color";
        aux.description = "Asuntos Personales";
        aux.startTime = "00:00";
        aux.finalTime = "23:59";      
        aux.isHidden = true;
        this.turnList.push(aux);
        this.APTurn = aux;
        this.storage.set("turns", this.turnList);
      }
        if (!baja) {
        aux = new Turn();
        aux.title = "B";
        aux.color = "Sin Color";
        aux.description = "Baja";
        aux.startTime = "00:00";
        aux.finalTime = "23:59";
        aux.isHidden = true;
        this.turnList.push(aux);
        this.bajaTurn = aux;
        this.storage.set("turns", this.turnList);
      }

    if (this.cuadranteList.length == 0) {
      var turns = [];
      turns.push(new Turn(this.turnList[1], 5));
      turns.push(new Turn(this.turnList[2], 2));
      turns.push(new Turn(this.turnList[0], 7));
      turns.push(new Turn(this.turnList[3], 5));
      turns.push(new Turn(this.turnList[0], 2));
      turns.push(new Turn(this.turnList[4], 5));
      turns.push(new Turn(this.turnList[5], 2));
      turns.push(new Turn(this.turnList[0], 7));

      this.cuadranteList.push(new Cuadrante(new Date('2021/7/19'), 35, turns));
      this.cuadranteList[0].id = Date.now();
      this.cuadranteList[0].name = "Q5";
      this.cuadranteList[0].isActive = false;
      this.storage.set("cuadrantes", this.cuadranteList);

    }

  }
}
