
import { LoadingController, NavController } from "@ionic/angular";
import { IonicNativePlugin } from '@ionic-native/core'
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { removeSummaryDuplicates } from "@angular/compiler";
import { PlacesService } from "../places/places.service";

declare var google: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  place_view_option: string = "map";
  map:any;
  latLng:any;
  markers:any;
  mapOptions:any;  
  isKM:any=500;
  isType:any="";
isOpen:boolean;

  public  x : any
 
  public details:any=[];
  placeType: any;
  photocopy: any;
  state: string;
  current_location: any;
  mapInitialised: boolean;
  show_map: boolean = true;


  constructor(private ngZone: NgZone, private geolocation : Geolocation,
   public navCtrl: NavController,
    private router: Router,
    private placesService: PlacesService,
    private loadCtrl: LoadingController,
    ) { }
  ngOnInit(): void {
    
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    this.mapInitialised = true;
    let current: any;
    this.geolocation.getCurrentPosition().then((position) => {

this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   

this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
this.current_location = this.latLng;
console.log('latLng',this.current_location);


current = {
  lat: position.coords.latitude,
  lng: position.coords.longitude
}


    }, (err) => {
      alert('err '+err);
    });

  }

  segmentChanged(event_object) {

    console.log(event_object);
    console.log(event_object.detail.value);
    if (event_object.detail.value === "list") {
      this.show_map = false;
    } else if (event_object.detail.value === "map") {
      this.show_map = true;
    }
  }

  nearbyPlace(){
    this.loadMap();
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
              location: this.latLng,
              radius: this.isKM,
              types: [this.isType]
            }, (results, status) => {
             this.placeType= this.isType
                this.callback(results, status);
            });
  }

  callback(results, status) {
    console.log(results);
    this.details=results;
   
    // console.log(results[0])
    // console.log(this.details[0].name)
    // console.log(this.details[14].user_ratings_total)
    // console.log(this.details[0].vicinity)
    // console.log(this.details[0].rating)
    // console.log(this.details[0].scope)
    // console.log(this.details[0].types)


    if (status === google.maps.places.PlacesServiceStatus.OK) {

      console.log(results);
     
        }

      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
        var place = results[i];
        let photo = place.icon;
        if (place.photos) {
          let photos_list = place.photos;
          photo = photos_list[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 })
          this.photocopy = photo;
 

      }
      let state_restuarant = "";
          if (place.opening_hours) {

            if (place.opening_hours.open_now) {

              state_restuarant = "Service is currently on and still open";
            } else {
              state_restuarant = "Service has currently closed for the day";
            }
          } else {
            state_restuarant = "Service has currently closed for the day";
          }


    }
  }

  onClick(item){
    this.loadCtrl.create({
      message: 'Creating place...'
    })
    .then(loadingEl => {
     loadingEl.present();
     var photo= item.photos[0].getUrl();
     this.placesService.addSearchPlace(
       this.placeType,
      photo,
       item.icon,
  item.name,
  item.rating,
  item.business_status,
  item.vicinity
    
      ).subscribe(() =>
      {
        console.log(item.name)
        loadingEl.dismiss();
      if(this.placeType == "hospital")
       this.router.navigate(['/places/tabs/search/hospital']);
      
      else if(this.placeType == "restaurant")
      this.router.navigate(['/places/tabs/search/restaurant']);

      else if(this.placeType == "bank")
      this.router.navigate(['/places/tabs/search/bank']);
   
      else if(this.placeType == "airport")
      this.router.navigate(['/places/tabs/search/airport']);

      else if(this.placeType == "gym")
      this.router.navigate(['/places/tabs/search/gym']);

      else if(this.placeType == "atm")
      this.router.navigate(['/places/tabs/search/atm']);

      else if(this.placeType == "zoo")
      this.router.navigate(['/places/tabs/search/zoo']);
      
      else if(this.placeType == "library")
      this.router.navigate(['/places/tabs/search/library']);

      else if(this.placeType == "shopping_mall")
      this.router.navigate(['/places/tabs/search/shopping-mall']);

      else if(this.placeType == "police")
      this.router.navigate(['/places/tabs/search/police-station']);
      });
   
    });
   
  }

  createMarker(place){
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
      
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.vicinity + '</div>');
        infowindow.open(this.map, this.markers);
        console.log("map=="+ JSON.stringify(this.markers))
      });
    });
  

   
  }
 

}
