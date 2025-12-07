import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherList } from './components/weather-list/weather-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-weather');
}
