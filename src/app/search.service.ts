import { Injectable } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
declare var google: any;


export interface ICategory {
  id: number,
  name: string,
  image: string,
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() { }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Hospitals',
      image: '../../assets/categories/category-1.png'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Restaurants',
      image: '../../assets/categories/category-2.png'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Bank',
      image: '../../assets/categories/category-3.png'
    }
    let cat4: ICategory = {
      id: 4,
      name: 'Airport',
      image: '../../assets/categories/category-1.png'
    }
    let cat5: ICategory = {
      id: 5,
      name: 'Gym',
      image: '../../assets/categories/category-2.png'
    }
    let cat6: ICategory = {
      id: 6,
      name: 'ATM',
      image: '../../assets/categories/category-3.png'
    } 
    let cat7: ICategory = {
      id: 7,
      name: 'Shooping Mall',
      image: '../../assets/categories/category-1.png'
    }
    let cat8: ICategory = {
      id: 8,
      name: 'Zoo',
      image: '../../assets/categories/category-2.png'
    }
    let cat9: ICategory = {
      id: 9,
      name: 'Police Station',
      image: '../../assets/categories/category-3.png'
    }
    let cat10: ICategory = {
      id: 10,
      name: 'library',
      image: '../../assets/categories/category-1.png'
    }


    categories.push(cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10);

    return categories;
  }


}
