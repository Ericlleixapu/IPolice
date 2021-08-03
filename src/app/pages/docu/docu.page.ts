import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docu',
  templateUrl: './docu.page.html',
  styleUrls: ['./docu.page.scss'],
})
export class DocuPage implements OnInit {

    public aux;
    public query;

  constructor() { }

  ngOnInit() {
    this.aux=0;
  }

  searchChange(event){
    this.query = event.detail.value;
  }

}
