import { Injectable } from '@angular/core';
import { Nota } from '../models/Nota';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private notas: Array<Nota>;
  private editNota: Nota;

  constructor(private storage: Storage) {
    this.editNota = null;
  }

  public async loadNotas() {
    const data = await this.storage.get("notas");
    if (data == null) {
      this.notas = [];
    } else {
      this.notas = data;
    }
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
    this.storage.set("notas", this.notas);
  }

  updateNota() {
    this.storage.set("notas", this.notas);
  }

  deleteNota(nota) {
    let aux = this.notas.indexOf(nota);
    if (aux != null) {
      this.notas.splice(aux, 1);
    }
    this.storage.set("notas", this.notas);
  }
}
