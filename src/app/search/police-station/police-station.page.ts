import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, IonItemSliding, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { searchPlace } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';
import { HintModalPage } from '../hint-modal/hint-modal.page';

@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.page.html',
  styleUrls: ['./police-station.page.scss'],
})
export class PoliceStationPage implements OnInit {
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

  openHintModal() {
    console.log("start")
    this.openModal(HintModalPage, ['inset-modal']);
    console.log("done")
  }
 
  async openModal(pageName, css: string[]) {
    const modal = await this.modalCtrl.create({
      component: pageName,
      cssClass: css // Global.scss
    });
    await modal.present();
  }
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
