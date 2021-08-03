import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/notas',
    pathMatch: 'full'
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'add-nota',
    loadChildren: () => import('./pages/add-nota/add-nota.module').then( m => m.AddNotaPageModule)
  },
  {
    path: 'docu',
    loadChildren: () => import('./pages/docu/docu.module').then( m => m.DocuPageModule)
  },
  {
    path: 'trafico',
    loadChildren: () => import('./pages/trafico/trafico.module').then( m => m.TraficoPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'perros',
    loadChildren: () => import('./pages/perros/perros.module').then( m => m.PerrosPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'marks',
    loadChildren: () => import('./pages/marks/marks.module').then( m => m.MarksPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
