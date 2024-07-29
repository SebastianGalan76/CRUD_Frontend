import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../service/city.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-city',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-city.component.html',
  styleUrl: '../../../../assets/styles/formElement.scss'
})
export class InputCityComponent {
  filteredCities: string[] = [];
  focused: boolean = false;

  public cityName?: string;

  constructor(private cityService: CityService) {}

  filterCities(prefix: string) {
    this.filteredCities = this.cityService.cities.filter(city => city.toLowerCase().startsWith(prefix.toLowerCase()));
  }

  selectCity(city: string) {
    this.cityName = city;
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
