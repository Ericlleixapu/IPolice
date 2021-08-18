import { Injectable } from '@angular/core';
import { Cuadrante } from '../models/Cuadrante';
import { Event } from '../models/Event';
import { Turn } from '../models/Turn';

import { Storage } from '@ionic/storage-angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private activeCuadrante: Cuadrante;
  private cuadranteList: Array<Cuadrante>;
  private turnList: Array<Turn>;
  private eventList: Array<Event>;

  public autoRefreshCalendar: Subject<Cuadrante> = new Subject();

  constructor(private storage: Storage) {

  }

  autoRefresh(): Observable<Cuadrante> {
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
  }
  deleteCuadrante(cuadrante) {
    let aux = this.cuadranteList.indexOf(cuadrante);
    if (aux != null) {
      this.cuadranteList.splice(aux, 1);
    }
    this.storage.set("cuadrantes", this.cuadranteList);
  }
  getActiveCuadrante() {
    if (this.cuadranteList.length > 0) {
      for (let cuadrante of this.cuadranteList) {
        if (cuadrante.isActive) return cuadrante;
      }
    }
    return null;
  }

  setNewActiveCuadrante(cuadrante) {
    for (let cuad of this.cuadranteList) {
      if (cuadrante.id == cuad.id) {
        cuad.isActive = cuadrante.isActive;
      } else {
        cuad.isActive = false;
      }
    }
    this.updateCuadrante();
    if (cuadrante.isActive) {
      this.autoRefreshCalendar.next(cuadrante);
    } else {
      this.autoRefreshCalendar.next(null);
    }

  }

  //GESTION DE TURNOS
  async loadTurnList() {
    const data = await this.storage.get("turns");
    if (data == null) {
      this.turnList = [];
    } else {
      this.turnList = data;
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
  async loadEventList() {
    const data = await this.storage.get("events");
    if (data == null) {
      this.eventList = [];
    } else {
      this.eventList = data;
    }
  }
  saveEvent(event) {
    this.eventList.push(event);
    this.storage.set("events", this.turnList);
  }
  getEventList() {
    return this.eventList;
  }
  updateEvent() {
    this.storage.set("events", this.eventList);
  }
  deleteEvent(event) {
    let aux = this.eventList.indexOf(event);
    if (aux != null) {
      this.eventList.splice(aux, 1);
    }
    this.storage.set("events", this.eventList);
  }




  //DATOS INICIALES APP
  initialData() {
    if (this.turnList.length == 0) {
      var aux = new Turn();
      aux.title = "F";
      aux.color = "Sin Color";
      aux.description = "Fiesta";
      aux.startTime = "0:0";
      aux.finalTime = "23:59";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "TM";
      aux.color = "turquoise";
      aux.description = "Turno de mañana";
      aux.startTime = "6:0";
      aux.finalTime = "14:0";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "M12";
      aux.color = "turquoise";
      aux.description = "Turno de mañana 12H";
      aux.startTime = "06:0";
      aux.finalTime = "18:0";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "TT";
      aux.color = "yellow";
      aux.description = "Turno de Tarde";
      aux.startTime = "14:0";
      aux.finalTime = "22:0";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "TN";
      aux.color = "pink";
      aux.description = "Turno de Noche";
      aux.startTime = "22:0";
      aux.finalTime = "6:0";
      this.turnList.push(aux);
      aux = new Turn();
      aux.title = "N12";
      aux.color = "pink";
      aux.description = "Turno de noche 12H";
      aux.startTime = "18:0";
      aux.finalTime = "6:0";
      this.turnList.push(aux);
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

      // turns = [];
      // turns.push(new Turn("TM", 5, "turquoise"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TM", 5, "turquoise"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TM", 5, "turquoise"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TT", 5, "yellow"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TT", 5, "yellow"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TT", 5, "yellow"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TN", 5, "pink"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TN", 5, "pink"));
      // turns.push(new Turn("F", 2, "green"));
      // turns.push(new Turn("TN", 5, "pink"));
      // turns.push(new Turn("F", 2, "green"));

      // this.cuadranteList.push(new Cuadrante(new Date('2021/7/19'), 63, turns));
      // this.cuadranteList[1].name = "SEAT";

      // this.storage.set("cuadrantes", this.cuadranteList);

    }

  }
}
