interface IPhoto {
  alt: string;
  src: string;
}

interface IOwner {
  name: string;
  super: boolean;
  img: IPhoto;
}

export interface IPoint {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface ICity {
  name: string;
  location: IPoint;
}

export interface IOffer {
  id: string;
  name: string;
  price: string | number;
  photos: IPhoto[];
  previewImage: IPhoto;
  isPremium: boolean;
  type: string;
  rate: number;
  bedrooms: number;
  maxAdults: number;
  description: string;
  facilities: string[];
  isFavorite: boolean;
  owner: IOwner;
  city: ICity;
  location: number[];
  cords: [number, number];
}
