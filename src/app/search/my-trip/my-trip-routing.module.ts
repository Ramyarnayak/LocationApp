import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTripPage } from './my-trip.page';

const routes: Routes = [
  {
    path: '',
    component: MyTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTripPageRoutingModule {}
