import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SancionTrafico } from '../models/SancionTrafico';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TraficoService {

  private fullList = [];
  private saved = [];


  endPoint = 'http://localhost:8100';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(public httpClient: HttpClient,public storageService:StorageService) {
  this.loadSaved();
  this.getAll();
  }

  private async getCONList(){
    const data = await this.httpClient.get<SancionTrafico[]>(this.endPoint + '/assets/data/transit/CONd.json', {observe: 'response'}).toPromise();
    return data.body; 
  }
  private async getCIRList(){
    const data = await this.httpClient.get<SancionTrafico[]>(this.endPoint + '/assets/data/transit/CIR.json', {observe: 'response'}).toPromise();
    return data.body; 
  }
  private async getAll(){
    let array = [];
    let array2 = [];
    array = await this.getCONList();
    array2 = await this.getCIRList();    

    this.fullList = this.repairList(array2.concat(array));
  }

  private repairList(list:SancionTrafico[]) {

    for (let sancion of list) {
      sancion.norma = sancion.norma.split(" ")[0];
      sancion.articulo = sancion.articulo.split(" ")[0];
      sancion.apartado = sancion.apartado.split(" ")[0];      
      const aux = sancion.multa.split(" ")[0];
      sancion.reducido = sancion.multa.split(" ")[1];
      sancion.multa = aux;
      if (typeof sancion.puntos === 'string') sancion.puntos = 0;
      if (this.saved.indexOf(sancion) > -1) sancion.isSaved=true;
    }
    return list;
  }

  

  public getFullList(){
    return this.fullList;
  }
  public getElements(initial, elements){
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

  save(sancion:SancionTrafico){
    this.fullList[this.fullList.indexOf(sancion)].isSaved = true;
    this.saved.push(sancion);   
    this.storageService.set("marks",this.saved); 
  }
  async loadSaved(){
    this.saved = await this.storageService.get("marks"); 
  }
  getSaved(){
    return this.saved;
  }
  delete(sancion:SancionTrafico){
    this.fullList[this.fullList.indexOf(sancion)].isSaved = false;
    let aux = this.saved.indexOf(sancion);
    if(aux != null){
      this.saved.splice(aux,1);
    }   
    this.storageService.set("marks",this.saved); 
  }
}
