import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirportPageRoutingModule } from './airport-routing.module';

import { AirportPage } from './airport.page';
import { HintModalPageModule } from '../hint-modal/hint-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirportPageRoutingModule,
    HintModalPageModule
  ],
  declarations: [AirportPage]
})
export class AirportPageModule {}
