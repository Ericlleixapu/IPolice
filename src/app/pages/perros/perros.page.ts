import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perros',
  templateUrl: './perros.page.html',
  styleUrls: ['./perros.page.scss'],
})
export class PerrosPage implements OnInit {

  constructor(
    public toastController: ToastController
    ) { }

  ngOnInit() {
  }

  async info() {
    const toast = await this.toastController.create({
      message: 'Real Decreto 287/2002, de 22 de marzo, por el que se desarrolla la Ley 50/1999, de 23 de diciembre.',
      duration: 4000
    });
    toast.present();
  }

}
