import { Component, OnInit } from '@angular/core';
import { Turn } from '../../models/Turn';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {

  public isNew=false;
  public turns:Array<Turn>;
  public newTurn:Turn;
  public startTime;
  public finalTime;

  constructor() { }

  ngOnInit() {

    this.turns = [];
    if(this.turns.length == 0){
      var aux = new Turn("F",0,"Sin Color");
      aux.description = "Fiesta";
      aux.startTime = "00:00";
      aux.finalTime = "23:59";
      this.turns.push(aux);
      var aux = new Turn("TM",0,"turquoise");
      aux.description = "Turno de mañana";
      aux.startTime = "06:00";
      aux.finalTime = "14:00";
      this.turns.push(aux);
      aux = new Turn("M12", 2,"turquoise");
      aux.description = "Turno de mañana 12H";
      aux.startTime = "06:00";
      aux.finalTime = "18:00";
      this.turns.push(aux);
      aux = new Turn("TT", 5,"yellow");
      aux.description = "Turno de Tarde";
      aux.startTime = "14:00";
      aux.finalTime = "22:00";
      this.turns.push(aux);
      aux = new Turn("TN", 5,"pink");   
      aux.description = "Turno de Noche";
      aux.startTime = "22:00";
      aux.finalTime = "06:00";
      this.turns.push(aux); 
      aux = new Turn("N12", 2,"pink");
      aux.description = "Turno de noche 12H";
      aux.startTime = "18:00";
      aux.finalTime = "06:00";
      this.turns.push(aux);

    }
  }

  addTurn(){
    this.newTurn = new Turn("",0,"");
    this.isNew = true;
  }

  clickSave(turn){
    this.isNew = false;

    var aux = new Date(this.startTime);    
    turn.startTime = aux.getHours() +":"+ aux.getMinutes()
    console.log(aux);

    aux = new Date(this.finalTime);
    turn.finalTime = aux.getHours() +":"+ aux.getMinutes()

    this.turns.push(turn);

var aux = new Date();
aux.getHours();
  }

  clickDelete(turn){
    this.deleteTurn(turn)
  }

  clickEdit(turn){
    this.newTurn = turn;
  }

  deleteTurn(turn) {
    let aux = this.turns.indexOf(turn);
    if (aux != null) {
      this.turns.splice(aux, 1);
    }
  }

}
