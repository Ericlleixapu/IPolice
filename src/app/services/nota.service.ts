import { Injectable } from '@angular/core';
import { Nota } from '../models/Nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private notas:Array<Nota>;
  private editNota: Nota;

  constructor() {
    this.notas = new Array<Nota>();
    this.editNota = null;
  }

  setEditNota(nota: Nota) {
    this.editNota = nota;    
  }
  getEditnota() {
    let aux = this.editNota;
    this.editNota = null;
    return aux;    
  }

  getNotas() {
    return this.notas;
  }

  saveNota(nota) {
    nota.id = Math.random();
    this.notas.push(nota);
  }

  updateNota(nota){

  }

  deleteNota(nota){
    let aux = this.notas.indexOf(nota);
    if(aux != null){
      this.notas.splice(aux,1);
    }
  }
}
