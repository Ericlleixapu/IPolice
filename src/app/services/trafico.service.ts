import { Injectable } from '@angular/core';
import { CON } from '../../assets/data/transit/CONd';
import { CIR } from '../../assets/data/transit/CIR';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { SancionTrafico } from '../models/SancionTrafico';

@Injectable({
  providedIn: 'root'
})
export class TraficoService {

  private conList = [];
  private cirList = [];

  private fullList = [];


  endPoint = 'http://localhost:8100';
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(public httpClient: HttpClient) {
    let con = new CON();
    let cir = new CIR();

    this.conList = con.data;
    this.cirList = cir.data;

    this.mergeList();

    let array:any = [];
    this.load().subscribe((data: {}) => {
      array = data;
      console.log(array);
    })

  }

  load(): Observable<SancionTrafico> {
    return this.httpClient.get<SancionTrafico>(this.endPoint + '/assets/data/transit/CONd.json')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  httpError(error) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }






  private mergeList() {

    this.fullList = this.cirList.concat(this.conList);

    for (let sancion of this.fullList) {
      sancion.norma = sancion.norma.split(" ")[0];
      sancion.articulo = sancion.articulo.split(" ")[0];
      sancion.apartado = sancion.apartado.split(" ")[0];
      sancion.multa = sancion.multa.split(" ")[0];
      if (typeof sancion.puntos === 'string') sancion.puntos = 0;
    }
  }

  getConList() {    
    return this.conList;
  }
  getCirList() {
    return this.cirList;
  }
  getAll() {
    return this.fullList;
  }
  getSearched(query) {
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
}
