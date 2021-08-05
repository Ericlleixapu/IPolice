import { Injectable } from '@angular/core';
import {SancionTrafico} from '../models/SancionTrafico';
import {CON} from '../../assets/data/transit/CONd';
import {CIR} from '../../assets/data/transit/CIR';

@Injectable({
  providedIn: 'root'
})
export class TraficoService {

  private conList = [];
  private cirList = [];

  private fullList = [];

  constructor() {
    let con = new CON();
    let cir = new CIR();

    this.conList = con.data;
    this.cirList = cir.data;

    this.mergeList();
   }

   private mergeList(){

     this.fullList = this.cirList.concat(this.conList);
     
     for(let sancion of this.fullList){
        sancion.norma = sancion.norma.split(" ")[0];
        sancion.articulo = sancion.articulo.split(" ")[0];
        sancion.apartado = sancion.apartado.split(" ")[0];
       sancion.multa = sancion.multa.split(" ")[0];
       if (typeof sancion.puntos === 'string')sancion.puntos = 0;
     }
   }

  getConList(){
    return this.conList;
  }
  getCirList(){
    return this.cirList;
  }
  getAll(){
    return this.fullList;
  }
  getSearched(query){
    let array = [];
    for(let sancion of this.fullList){
      if(sancion.texto.toUpperCase()
      .replace(/[ÁÀ]/,"A")
      .replace(/[ÉÈ]/,"E")
      .replace(/[ÍÌ]/,"I")
      .replace(/[ÓÒ]/,"O")
      .replace(/[ÚÙ]/,"U")
      .includes(query.toUpperCase()
      .replace(/[ÁÀ]/,"A")
      .replace(/[ÉÈ]/,"E")
      .replace(/[ÍÌ]/,"I")
      .replace(/[ÓÒ]/,"O")
      .replace(/[ÚÙ]/,"U")
      )){
        array.push(sancion);
      }
    }
    return array;
  }
}
