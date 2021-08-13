import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import {Event} from "../../models/Event";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
 
  public calendario = true;
  public cuadrante = false;
  public turnos = false;

  constructor(
    public toastController: ToastController
  ) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 1500
    });
    toast.present();
  }
 
  ngOnInit() {}
 
  
}
