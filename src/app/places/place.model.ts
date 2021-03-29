import { PlaceLocation } from './location.model';





export class searchPlace {
  constructor(
    public id: string,
    public placeType:string,
    public imageURL: string,
    public imageIcon: string,
    public name: string,
    public rating: number,
    public vicinity: string,
    public business_status: string,
    public userId: string
  
  ) {}
}
export class Place {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public category: string,
    // public imageUrl: string,
    public price: number,
    public availableFrom: Date,
    public availableTo: Date,
    public userId: string,
    public location: PlaceLocation,
  ) {}
  }

  export class PlaceDup {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public category: string,
    
      public price: number,
      public availableFrom: Date,
      public availableTo: Date,
      public userId: string,
      public location: PlaceLocation,
         public imageUrl: string,
    ) {}
}
