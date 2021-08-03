import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {

  public query;
  
  constructor() { }

  ngOnInit() {
  }

  searchChange(event){
    this.query = event.detail.value;
  }
}
