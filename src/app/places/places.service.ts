import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place, PlaceDup, searchPlace } from './place.model';
import { AuthService } from '../auth/auth.service';
import { PlaceLocation } from './location.model';
import { PlaceDetailPageModule } from './discover/place-detail/place-detail.module';

// [
//   new Place(
//     'p1',
//     'Manhattan Mansion',
//     'In the heart of New York City.',
//     'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
//     149.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p2',
//     "L'Amour Toujours",
//     'A romantic place in Paris!',
//     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
//     189.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   ),
//   new Place(
//     'p3',
//     'The Foggy Palace',
//     'Not your average city trip!',
//     'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
//     99.99,
//     new Date('2019-01-01'),
//     new Date('2019-12-31'),
//     'abc'
//   )
// ]

interface searchPlaceData {
  placeType:string;
  imageURL?: string,
  imageIcon:string,
 name: string;
 rating: number;
vicinity: string;
business_status: string;
userId: string;
}


interface PlaceData {
  availableFrom: string;
  availableTo: string;
  description: string;
  category: string,
  // imageUrl: string;
  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
}


interface PlaceDataDup {
  availableFrom: string;
  availableTo: string;
  description: string;
  category: string,

  price: number;
  title: string;
  userId: string;
  location: PlaceLocation;
  imageUrl: string;

}


@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);
  private _searchplaces = new BehaviorSubject<searchPlace[]>([]);
  private _placesDup = new BehaviorSubject<PlaceDup[]>([]);
  get places() {
    return this._places.asObservable();
  }
  get searchplaces() {
    return this._searchplaces.asObservable();
  }
  get placesDup(){
    return this._placesDup.asObservable();
  }
  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: PlaceData }>(
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`
        );
      }),
      map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                // resData[key].imageUrl,
                resData[key].category,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                 resData[key].userId,
                resData[key].location
              )
            );
          }
        }
        return places;
        // return [];
      }),
      tap(places => {
        this._places.next(places);
      })
    );
  }

  getPlace(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<PlaceData>(
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/offered-places/${id}.json?auth=${token}`
        );
      }),
      
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
         placeData.category,
          // placeData.imageUrl,
          placeData.price,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
           placeData.userId,
           placeData.location
        );
      })
    );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.post<{ imageUrl: string; imagePath: string }>(
          'https://us-central1-ionic-angular-course.cloudfunctions.net/storeImage',
          uploadData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    category: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    // imageUrl: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newPlace: Place;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
        console.log(userId)
      }),
      take(1),
      switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newPlace = new Place(
          Math.random().toString(),
          title,
          description,
          category,
          // imageUrl,
          price,
          dateFrom,
          dateTo,
          fetchedUserId,
          location
        );
        return this.http.post<{ name: string }>(
       
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/offered-places.json?auth=${token}`,
          {
            ...newPlace,
            id: null
          }
        
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        console.log(resData)
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.places;
      }),
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.category,
          // oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId,
          oldPlace.location
        );
        return this.http.put(
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/offered-places/${placeId}.json?auth=${fetchedToken}`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }

  addSearchPlace(
    placeType: string,
    imageURL: string,
    
    imageIcon: string,
     name: string,
    rating: number,
    business_status: string,
   vicinity: string
   ) {
     let generatedId: string;
     let newSearchPlace: searchPlace;
     return this.authService.userId.pipe(take(1), switchMap(userId => { 
       if(!userId){
         throw new Error('No user found!');
       }
       newSearchPlace = new searchPlace(
         Math.random().toString(),
         placeType,
         imageURL,
         imageIcon,
         name,
         rating,
         business_status,
         vicinity,
         userId
    
     );
  
    
     return this.http
       .post<{ name: string }>(
         'https://ionicapp-2c68e-default-rtdb.firebaseio.com/search-places.json',
         {
           ...newSearchPlace,
           id: null
         }
       )
   }))
       .pipe(
         switchMap(resData => {
           console.log(resData)
           generatedId = resData.name;
           return this.searchplaces;
         }),
         take(1),
         tap(searchplaces => {
           newSearchPlace.id = generatedId;
           this._searchplaces.next(searchplaces.concat(newSearchPlace));
         })
       );
     // return this.places.pipe(
     //   take(1),
     //   delay(1000),
     //   tap(places => {
     //     this._places.next(places.concat(newPlace));
     //   })
     // );
   }
   
 
   fetchSearchPlaces() {
     return this.http
       .get<{ [key: string]: searchPlaceData }>(
         'https://ionicapp-2c68e-default-rtdb.firebaseio.com/search-places.json'
       )
       .pipe(
         map(resData => {
           const searchplaces = [];
           
           for (const key in resData) {
             if (resData.hasOwnProperty(key)) {
               searchplaces.push(
                 new searchPlace(
                   key,
                   resData[key].placeType,
                   resData[key].imageURL,
                   resData[key].imageIcon,
                   resData[key].name,
                   resData[key].rating,
                   resData[key].business_status,
                   resData[key].vicinity,
                  
                   resData[key].userId
                 )
                
               );
 
             }
           }
           console.log(searchplaces)
           return searchplaces;
           // return [];
         }),
         tap(searchplaces => {
           this._searchplaces.next(searchplaces);
         })
       );
   }
 
  
   getSearchPlace(id: string) {
     return this.http
       .get<searchPlaceData>(
         `https://ionicapp-2c68e-default-rtdb.firebaseio.com/search-places/${id}.json`
       )
       .pipe(
         map(searchplaceData => {
           return new searchPlace(
             id,
             searchplaceData.placeType,
             searchplaceData.imageURL,
             searchplaceData.imageIcon,
             searchplaceData.name,
             searchplaceData.rating,
             searchplaceData.business_status,
             searchplaceData.vicinity,
             searchplaceData.userId
           );
         })
       );
   }


   cancelPlaces(placeId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.delete(
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/search-places/${placeId}.json`
        );
      }),
      switchMap(() => {
        return this.searchplaces;
      }),
      take(1),
      tap(searchPlace => {
        this._searchplaces.next(searchPlace.filter(p => p.id !== placeId));
      })
    );
  }

  addFavourites(
    title: string,
    description: string,
    category: string,
    price: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
     imageUrl: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newPlace: PlaceDup;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
        console.log(userId)
      }),
      take(1),
      switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newPlace = new PlaceDup(
          Math.random().toString(),
          title,
          description,
          category,
         
          price,
          dateFrom,
          dateTo,
          fetchedUserId,
          location,
           imageUrl,
        );
        return this.http.post<{ name: string }>(
       
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/favourites.json?auth=${token}`,
          {
            ...newPlace,
            id: null
          }
        
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        console.log(resData)
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }



  fetchPlacesFavourites() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: PlaceDataDup }>(
          `https://ionicapp-2c68e-default-rtdb.firebaseio.com/favourites.json?auth=${token}`
        );
      }),
      map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new PlaceDup(
                key,
                resData[key].title,
                resData[key].description,
               
                resData[key].category,
                resData[key].price,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                 resData[key].userId,
                resData[key].location,
                resData[key].imageUrl
              )
            );
          }
        }
        return places;
        // return [];
      }),
      tap(places => {
        this._places.next(places);
      })
    );
  }

}
