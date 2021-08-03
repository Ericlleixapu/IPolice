import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trafico',
  templateUrl: './trafico.page.html',
  styleUrls: ['./trafico.page.scss'],
})
export class TraficoPage implements OnInit {

  public query;
  
  constructor() { }

  ngOnInit() {
  }

  searchChange(event){
    this.query = event.detail.value;
  }
}
