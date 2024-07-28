import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/City';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private readonly URL = "http://localhost:8080/api/city";

  cities: string[] = [];
  filteredCities: string[] = [];

  focused: boolean = false;

  constructor(private http: HttpClient) {
    this.loadAllCities().subscribe(value => {
      var cities: City[] = value;

      this.cities = cities.map(city => city.name);
      this.filteredCities = this.cities;
    });
  }

  loadAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.URL);
  }

  filterCities(prefix: string) {
    this.filteredCities = this.cities.filter(city => city.toLowerCase().startsWith(prefix.toLowerCase()));
  }

  selectCity(city: string, input: HTMLInputElement) {
    input.value = city;
  }

  showPanel() {
    this.focused = true;
  }

  hidePanel() {
    setTimeout(() => {
      this.focused = false;
    }, 100);
  }
}
