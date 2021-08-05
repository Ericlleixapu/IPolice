import { Component, OnInit, ViewChild } from '@angular/core';
import {TraficoService} from '../../services/trafico.service';
import { IonContent, NavController } from '@ionic/angular';

@Component({
  selector: 'app-trafico',
  templateUrl: './trafico.page.html',
  styleUrls: ['./trafico.page.scss'],
})
export class TraficoPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  
  public query;
  public sancionesList = [];
  
  constructor(public navCtrl: NavController, private TraficoService: TraficoService) { }

  ngOnInit() {
    this.sancionesList = this.TraficoService.getAll();
  }

  searchChange(event){
    this.query = event.detail.value;
    if(this.query.length > 0){
    this.sancionesList = this.TraficoService.getSearched(this.query);
    }else{
      this.sancionesList = this.TraficoService.getAll();
    }
    this.content.scrollToTop(1500);
  }
}
