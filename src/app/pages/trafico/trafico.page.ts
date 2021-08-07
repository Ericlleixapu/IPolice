import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';

import { TraficoService } from '../../services/trafico.service';
import { SancionTrafico } from 'src/app/models/SancionTrafico';

@Component({
  selector: 'app-trafico',
  templateUrl: './trafico.page.html',
  styleUrls: ['./trafico.page.scss'],
})
export class TraficoPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  public query;
  public sancionesList: SancionTrafico[];
  public searching:boolean = false;

  private initial = 0;
  public elements = 30;

  constructor(public navCtrl: NavController, public TraficoService: TraficoService) { }

   ngOnInit() {
    this.loadList();
  }

  scroll(event){
    this.elements += 30;
    this.loadList();
    event.target.complete();
  }

  async loadList() {
    await this.TraficoService.load();
    const data = this.TraficoService.getElements(this.initial,this.elements);
    this.sancionesList = data;
  }

  searchChange(event) {
    this.query = event.detail.value;
    if (this.query.length > 0) {
      this.searching =true;
      this.sancionesList = this.TraficoService.getSearched(this.query);
    } else {
      this.searching =false;
      this.elements = 30;
      this.loadList();
    }
    this.content.scrollToTop(1500);
  }

  saveSancion(sancion:SancionTrafico){
    this.TraficoService.save(sancion);
  }
  removeSancion(sancion){
    this.TraficoService.delete(sancion);
  }
}
