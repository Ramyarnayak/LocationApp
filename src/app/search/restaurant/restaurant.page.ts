import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationAccuracyOriginal } from '@ionic-native/location-accuracy';
import { IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { searchPlace } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {
  panelOpenState: boolean;
  results: searchPlace[]
  isLoading = false;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService,
    public modalCtrl: ModalController, private router: Router, private loadingCtrl: LoadingController) {}

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
}
