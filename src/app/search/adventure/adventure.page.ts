import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { OffersPage } from 'src/app/places/offers/offers.page';
import { Place } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';


interface IDataList {
  productName: string;
  author: string;
  pictureProduct: string;
  category: string;
  price: number;
  visible?: boolean;
}

export const LIST_DATA: IDataList[] = [
  {
    productName: `Beneath a Scarlet Sky: A Novel`,
    author: 'Mark Sullivan',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/beneath _scarlet.jpg',
    category: 'Literature & Fiction',
    price: 5.99
  },
  {
    productName: `The Orphan's Tale: A Novel`,
    author: 'Pam Jenoff',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/the_orphan_tale.jpg',
    category: 'Literature & Fiction',
    price: 10.37
  },
  {
    productName: 'All the Light We Cannot See: A Novel',
    author: 'Anthony Doerr',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/all_light_we_cannot_see.jpeg',
    category: 'Literature & Fiction',
    price: 12.99
  },
  {
    productName: 'Rules of Civility: A Novel',
    author: 'Rules of Civility: A Novel',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/rules_civility.jpg',
    category: 'Literature & Fiction',
    price: 11.79
  },
  {
    productName: 'The Glass Castle: A Memoir',
    author: 'Jeannette Walls',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/the_glass_castle.jpg',
    category: 'Biographies & Memoirs',
    price: 5.14
  },
  {
    productName: 'Born a Crime: Stories from a South African Childhood',
    author: 'Trevor Noah',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/born_a_crime.jpg',
    category: 'Biographies & Memoirs',
    price: 6.0
  },
  {
    productName: 'Al Franken, Giant of the Senate',
    author: 'Al Franken',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/giant_of_the_senate.jpg',
    category: 'Biographies & Memoirs',
    price: 6.39
  },
  {
    productName: 'Pandemic (The Extinction Files Book 1)',
    author: 'A.G. Riddle',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/pandemic.jpg',
    category: 'Biographies & Memoirs',
    price: 5.47
  },
  {
    productName: 'Origin: A Novel',
    author: 'Dan Brown',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/origin.jpg',
    category: 'Suspense',
    price: 10.99
  },
  {
    productName: 'The Rooster Bar',
    author: 'John Grisham',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/the_rooster_bar.jpg',
    category: 'Suspense',
    price: 10.99
  },
  {
    productName: 'The Life We Bury',
    author: 'Dan Brown',
    pictureProduct: './assets/yannbf/img/reactive-list-labels/the_life_we_bury.jpg',
    category: 'Suspense',
    price: 10.99
  }
];





@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.page.html',
  styleUrls: ['./adventure.page.scss'],
})
export class AdventurePage implements OnInit {
  public dataList = LIST_DATA;
  public currentCategory: string = this.dataList[0].category;
  offers:any;
  placesSub: Subscription;
  isLoading = false;
  constructor(
    private ngZone: NgZone,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,

  ) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
   
      console.log(this.offers)
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  scroll(event){
    console.log(event);
  
    
    // this.itemIsVisible(event)
  }

  public itemIsVisible($event, book?: Place) {
    console.log(book, $event);
    // book.visible = $event;
    this.setCategory();
  }

  private setCategory() {
    const obj = {};
    let qtdVisibleCategory = 0;
    let higherCategory = '';
    this.dataList
      .filter(bk => bk.visible)
      .forEach(
        bk => (obj[bk.category] = obj[bk.category] ? obj[bk.category] + 1 : 1)
      );
    for (const key in obj) {
      if (obj[key] > qtdVisibleCategory) {
        qtdVisibleCategory = obj[key];
        higherCategory = key;
      }
    }

    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => {
        this.currentCategory = higherCategory;
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}

