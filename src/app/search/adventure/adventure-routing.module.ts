import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdventurePage } from './adventure.page';

const routes: Routes = [
  {
    path: '',
    component: AdventurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdventurePageRoutingModule {}
