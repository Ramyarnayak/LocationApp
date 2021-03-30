import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdventurePageRoutingModule } from './adventure-routing.module';

import { AdventurePage } from './adventure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdventurePageRoutingModule
  ],
  declarations: [AdventurePage]
})
export class AdventurePageModule {}
