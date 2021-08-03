import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraficoPageRoutingModule } from './trafico-routing.module';

import { TraficoPage } from './trafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraficoPageRoutingModule
  ],
  declarations: [TraficoPage]
})
export class TraficoPageModule {}
