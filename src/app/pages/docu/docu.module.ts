import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocuPageRoutingModule } from './docu-routing.module';

import { DocuPage } from './docu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocuPageRoutingModule
  ],
  declarations: [DocuPage]
})
export class DocuPageModule {}
