import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocuPage } from './docu.page';

const routes: Routes = [
  {
    path: '',
    component: DocuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocuPageRoutingModule {}
