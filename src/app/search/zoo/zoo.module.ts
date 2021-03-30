import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZooPageRoutingModule } from './zoo-routing.module';

import { ZooPage } from './zoo.page';
import { HintModalPageModule } from '../hint-modal/hint-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZooPageRoutingModule,
    HintModalPageModule
  ],
  declarations: [ZooPage]
})
export class ZooPageModule {}
