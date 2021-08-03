import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotaPageRoutingModule } from './add-nota-routing.module';

import { AddNotaPage } from './add-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNotaPageRoutingModule
  ],
  declarations: [AddNotaPage]
})
export class AddNotaPageModule {}
