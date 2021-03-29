import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  isLoading = false;
  private placesSub: Subscription;

  


  cards = [
    {
      imageUrl: 'assets/yannbf/img/card/advance-card-map-madison.png',
      name: 'Madison Map',
      ETA: '18 min',
      distance: 2.6,
      places: [
        {
          name: 'Museum of Football',
          address: '11 N. Way St, Madison, WI 53703',
          icon: 'football'
        },
        {
          name: 'Institute of Fine Cocktails',
          address: '14 S. Hop Avenue, Madison, WI 53703',
          icon: 'wine'
        }
      ]
    },
    {
      imageUrl: 'assets/yannbf/img/card/advance-card-map-mario.png',
      name: 'Super Mario Map',
      ETA: '3 hr',
      distance: 4.8,
      places: [
        {
          name: 'Yoshi\s Island',
          address: 'Iggy Koopa',
          icon: 'cloud'
        },
        {
          name: 'Forest of Illusion',
          address: 'Roy Koopa',
          icon: 'leaf'
        }
      ]
    },
    {
      imageUrl: 'assets/yannbf/img/card/advance-card-map-paris.png',
      name: 'Paris Map',
      ETA: '26 min',
      distance: 8.1,
      places: [
        {
          name: 'Museum of Information',
          address: '44 Rue de Info, 75010 Paris, France',
          icon: 'information-circle'
        },
        {
          name: 'General Pharmacy',
          address: '1 Avenue Faux, 75010 Paris, France',
          icon: 'leaf'
        }
      ]
    },
  ];

  constructor(private modaCtrl: ModalController, private placesService: PlacesService, private router: Router) {

  }
  placeTapped(place) {
    alert(place.name + ' was tapped.');
  }

  getDirections(card) {
    alert('Getting directions to ' + card.name);
  }

  seeInMap(place) {
//  this.router.navigateByUrl(place.location.staticMapImageUrl)
 window.open(place.location.staticMapImageUrl, '_system', 'location=yes');
  }

  dismiss() {
    this.modaCtrl.dismiss();
  }


  // constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  
}
