import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: 'hospital',
    loadChildren: () => import('./hospital/hospital.module').then( m => m.HospitalPageModule)
  },
  {
    path: 'restaurant',
    loadChildren: () => import('./restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'airport',
    loadChildren: () => import('./airport/airport.module').then( m => m.AirportPageModule)
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then( m => m.BankPageModule)
  },
  {
    path: 'gym',
    loadChildren: () => import('./gym/gym.module').then( m => m.GymPageModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./library/library.module').then( m => m.LibraryPageModule)
  },
  {
    path: 'zoo',
    loadChildren: () => import('./zoo/zoo.module').then( m => m.ZooPageModule)
  },
  {
    path: 'police-station',
    loadChildren: () => import('./police-station/police-station.module').then( m => m.PoliceStationPageModule)
  },
  {
    path: 'shopping-mall',
    loadChildren: () => import('./shopping-mall/shopping-mall.module').then( m => m.ShoppingMallPageModule)
  },
  {
    path: 'for-weekend',
    loadChildren: () => import('./for-weekend/for-weekend.module').then( m => m.ForWeekendPageModule)
  },
  {
    path: 'hint-modal',
    loadChildren: () => import('./hint-modal/hint-modal.module').then( m => m.HintModalPageModule)
  },
  {
    path: 'for-family',
    loadChildren: () => import('./for-family/for-family.module').then( m => m.ForFamilyPageModule)
  },
  {
    path: 'my-trip',
    loadChildren: () => import('./my-trip/my-trip.module').then( m => m.MyTripPageModule)
  },
  {
    path: 'adventure',
    loadChildren: () => import('./adventure/adventure.module').then( m => m.AdventurePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
