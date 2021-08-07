import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import {Nota} from '../../models/Nota';

import {NotaService} from '../../services/nota.service';

@Component({
  selector: 'app-add-nota',
  templateUrl: './add-nota.page.html',
  styleUrls: ['./add-nota.page.scss'],
})
export class AddNotaPage implements OnInit {
public nota:Nota;
public fecha;

  constructor(
    public navCtrl: NavController, 
    private notaService:NotaService
    ) { }

  ngOnInit() {
    this.nota = this.notaService.getEditnota();
    if(this.nota == null){
      this.nota = new Nota();
    }else{
      if(this.nota.fecha != null){
      this.fecha = this.nota.fecha.toISOString();
      }
    }
    
  }

  setFecha(){
    this.nota.fecha = new Date(this.fecha);
  }

  saveNota(){

    if(this.nota.titulo == ""){
      this.nota.titulo = "Nota"
    }
    if(this.nota.text == ""){
      this.nota.text = "nota sin texto."
    }
    this.notaService.saveNota(this.nota);
    this.getBack();
  }

  updateNota(){
    this.notaService.updateNota();
    this.getBack();
  }
  deleteNota(){
    this.notaService.deleteNota(this.nota);
    this.getBack();
  }

  getBack(){
    this.navCtrl.navigateBack('/notas');  
  }
}
