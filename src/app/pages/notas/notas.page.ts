import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import {NotaService} from '../../services/nota.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})

export class NotasPage implements OnInit {

  public notas;

  constructor(public navCtrl: NavController, private notaService: NotaService) {

  }

  ngOnInit() {
    this.notas = this.notaService.getNotas();
  }


  addNota() {

    this.navCtrl.navigateForward('/add-nota');
    
  }
  editNota(nota){
    this.notaService.setEditNota(nota);
    this.navCtrl.navigateForward('/add-nota');
  }

}
