import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { NgCalendarModule } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import{IonicStorageModule} from'@ionic/storage-angular';

import { NotaService } from './services/nota.service';
import { TraficoService } from './services/trafico.service';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgCalendarModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NotaService,
    TraficoService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
