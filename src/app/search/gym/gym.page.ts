import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { searchPlace } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.page.html',
  styleUrls: ['./gym.page.scss'],
})
export class GymPage implements OnInit {
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
