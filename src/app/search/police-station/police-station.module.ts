import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliceStationPageRoutingModule } from './police-station-routing.module';

import { PoliceStationPage } from './police-station.page';
import { HintModalPageModule } from '../hint-modal/hint-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliceStationPageRoutingModule,
    HintModalPageModule
  ],
  declarations: [PoliceStationPage]
})
export class PoliceStationPageModule {}
