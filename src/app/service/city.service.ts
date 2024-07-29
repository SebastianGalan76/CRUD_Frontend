import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/City';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly URL = "https://test43.alwaysdata.net/api/city";

  cities: string[] = [];

  constructor(private http: HttpClient) {
    this.loadAllCities().subscribe(value => {
      var cities: City[] = value;

      this.cities = cities.map(city => city.name);
    });
  }

  loadAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.URL);
  }
}
