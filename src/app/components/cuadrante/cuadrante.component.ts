import { Component, OnInit } from '@angular/core';
import { Turn } from 'src/app/models/Turn';
import { Cuadrante } from 'src/app/models/Cuadrante';

@Component({
  selector: 'app-cuadrante',
  templateUrl: './cuadrante.component.html',
  styleUrls: ['./cuadrante.component.scss'],
})
export class CuadranteComponent implements OnInit {

  public cuadrantes:Array<Cuadrante>;

  constructor() { }

  ngOnInit() {

    this.cuadrantes = [];
    if(this.cuadrantes.length == 0){
      var turns=[];
      turns.push(new Turn("F", 7,""));
      turns.push(new Turn("TM", 5,"turquoise"));
      turns.push(new Turn("M12", 2,"turquoise"));
      turns.push(new Turn("F", 7,""));
      turns.push(new Turn("TT", 5,"yellow"));
      turns.push(new Turn("F", 2,""));
      turns.push(new Turn("TN", 5,"pink"));    
      turns.push(new Turn("N12", 2,"pink"));
  
      this.cuadrantes.push(new Cuadrante(new Date('2021/7/12'), 35, turns));
      this.cuadrantes[0].name = "Q5";

    }
  }
  
  addCuadrante(){

  }
  clickSave(){

  }
  clickDelete(cuadrante){

  }
}
