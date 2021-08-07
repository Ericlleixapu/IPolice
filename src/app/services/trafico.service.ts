import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SancionTrafico } from '../models/SancionTrafico';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TraficoService {

  private fullList = [];
  private saved = [];

  //endPoint = 'http://localhost:8100';

  constructor(public httpClient: HttpClient, private storage: Storage) {
  }

  public async load() {
    await this.loadSaved();
    await this.getAll();
  }

  public async loadSaved() {
    const data = await this.storage.get("marks");
    if (data == null) {
      this.saved = [];
    } else {
      this.saved = data;
    }
  }

  private async getCONList() {
    const data = await this.httpClient.get<SancionTrafico[]>('/assets/data/transit/CONd.json', { observe: 'response' }).toPromise();
    return data.body;
  }
  private async getCIRList() {
    const data = await this.httpClient.get<SancionTrafico[]>('/assets/data/transit/CIR.json', { observe: 'response' }).toPromise();
    return data.body;
  }
  private async getAll() {
    const array = await this.getCONList();
    const array2 = await this.getCIRList();

    this.fullList = this.repairList(array2.concat(array));
  }

  private repairList(list: SancionTrafico[]) {

    let id = 0;

    for (let sancion of list) {
      sancion.id = id++;
      sancion.norma = sancion.norma.split(" ")[0];
      sancion.articulo = sancion.articulo.split(" ")[0];
      sancion.apartado = sancion.apartado.split(" ")[0];
      const aux = sancion.multa.split(" ")[0];
      sancion.reducido = sancion.multa.split(" ")[1];
      sancion.multa = aux;
      if (typeof sancion.puntos === 'string') sancion.puntos = 0;
    }
    if (this.saved.length > 0) {
      for (let sancion of this.saved) {
        list[sancion.id].isSaved = true;
      }
    }
    return list;
  }

  public getElements(initial, elements) {
    return this.fullList.slice(initial, elements);
  }

  public getSearched(query) {
    let array = [];
    for (let sancion of this.fullList) {
      if (sancion.texto.toUpperCase()
        .replace(/[ÁÀ]/, "A")
        .replace(/[ÉÈ]/, "E")
        .replace(/[ÍÌ]/, "I")
        .replace(/[ÓÒ]/, "O")
        .replace(/[ÚÙ]/, "U")
        .includes(query.toUpperCase()
          .replace(/[ÁÀ]/, "A")
          .replace(/[ÉÈ]/, "E")
          .replace(/[ÍÌ]/, "I")
          .replace(/[ÓÒ]/, "O")
          .replace(/[ÚÙ]/, "U")
        )) {
        array.push(sancion);
      }
    }
    return array;
  }

  save(sancion: SancionTrafico) {
    this.fullList[this.fullList.indexOf(sancion)].isSaved = true;
    this.saved.push(sancion);
    this.storage.set("marks", this.saved);
  }

  getSaved() {
    return this.saved;
  }

  delete(sancion: SancionTrafico) {
    this.fullList[sancion.id].isSaved = false;
    let aux = this.saved.indexOf(sancion);
    if (aux != null) {
      this.saved.splice(aux, 1);
    }
    this.storage.set("marks", this.saved);
  }
}
