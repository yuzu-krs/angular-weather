import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-weather-list',
  imports: [],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList {
  title = '天気情報一覧';
  private weatherService = inject(WeatherService);
  weatherList = this.weatherService.weatherList;
}
