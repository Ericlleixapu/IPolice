import { Component, OnInit } from '@angular/core';

import { TraficoService } from '../../services/trafico.service';
import { SancionTrafico } from 'src/app/models/SancionTrafico';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.page.html',
  styleUrls: ['./marks.page.scss'],
})
export class MarksPage implements OnInit {

  public sancionesList: SancionTrafico[];

  constructor(public TraficoService: TraficoService) { }

  ngOnInit() {
    this.sancionesList = this.TraficoService.getSaved();
  }
  removeSancion(sancion){
    this.TraficoService.delete(sancion);
  }
}
