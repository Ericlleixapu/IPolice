import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNotaPage } from './add-nota.page';

const routes: Routes = [
  {
    path: '',
    component: AddNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNotaPageRoutingModule {}
