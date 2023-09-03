import { EOrderType } from "../enums/restaurant.enum";

export interface IRestaurant {
    id: number;
    name: string;
    nameEn: string;
    category: string;
    image: string;
    location: string;
    phone: string;
    googleMap: string;
    rating: number;
    description: string;
}

export interface IRestaurantSearchOptions {
    userId: number;
    keyword: string;
    offset: number;
    limit: number;
    orderType: EOrderType;
}