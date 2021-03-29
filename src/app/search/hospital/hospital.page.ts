


import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlacesService } from 'src/app/places/places.service';
import { Place, searchPlace } from 'src/app/places/place.model';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { BookingService } from 'src/app/bookings/booking.service';


declare var google: any;
@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})


export class HospitalPage implements OnInit, OnDestroy {
  
  panelOpenState: boolean;
  results: searchPlace[]
  isLoading = false;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.placesSub = this.placesService.searchplaces.subscribe(places => {
      this.results = places;
      
      console.log("place===" + JSON.stringify(places))
    });
    
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchSearchPlaces().subscribe(() => {
      this.isLoading = false;
      console.log(this.placesService.fetchSearchPlaces())
      
    });
  }

  onCancel(placeId: string) {

    console.log("yws")
    this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.placesService.cancelPlaces(placeId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

 

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
