import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForFamilyPageRoutingModule } from './for-family-routing.module';

import { ForFamilyPage } from './for-family.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForFamilyPageRoutingModule
  ],
  declarations: [ForFamilyPage]
})
export class ForFamilyPageModule {}
