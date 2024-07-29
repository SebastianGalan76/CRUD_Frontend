import { City } from "./City";

export interface Campaign {
    id: number;
    name: string;
    bidAmount: number;
    campaignFund: number;
    status: boolean;
    keywords: string;
    city: City;
    radius: number;
}