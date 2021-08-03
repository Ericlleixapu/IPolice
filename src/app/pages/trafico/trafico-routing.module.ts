import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraficoPage } from './trafico.page';

const routes: Routes = [
  {
    path: '',
    component: TraficoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraficoPageRoutingModule {}
