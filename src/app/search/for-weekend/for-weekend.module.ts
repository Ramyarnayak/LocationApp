import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForWeekendPageRoutingModule } from './for-weekend-routing.module';

import { ForWeekendPage } from './for-weekend.page';
import { Camera } from '@capacitor/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForWeekendPageRoutingModule,

  ],

  declarations: [ForWeekendPage]
})
export class ForWeekendPageModule {}
