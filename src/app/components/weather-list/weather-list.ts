import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/weather';
import { signal } from '@angular/core';
import { Weather } from '../../models/weather';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-list.html',
  styleUrl: './weather-list.css',
})
export class WeatherList {
  title = '天気情報一覧';
  private weatherService = inject(WeatherService);
  weatherList = this.weatherService.weatherList;

  selectedWeatherId = signal<number | null>(null);
  newCity = signal<string>('');
  newTemperature = signal(0);
  newCondition = signal('');

  // クリック時に削除
  onDelete(id: number): void {
    this.weatherService.deleteWeather(id);
    this.selectedWeatherId.set(null);
  }

  // クリック時に選択
  onSelectWeather(id: number): void {
    this.selectedWeatherId.set(this.selectedWeatherId() === id ? null : id);
  }

  // onAddWeather(): 新しい天気データを追加するメソッド
  onAddWeather(): void {
    // 入力値（都市名・天気・気温）がすべてある場合のみ追加
    if (this.newCity() && this.newCondition() && this.newTemperature()) {
      // 新しい Weather オブジェクトを作成
      const newWeather: Weather = {
        id: Math.max(...this.weatherList().map((w) => w.id), 0) + 1, // 新しい id を自動生成
        city: this.newCity(), // 入力された都市名
        temperature: this.newTemperature(), // 入力された気温
        condition: this.newCondition(), // 入力された天気
        humidity: 50, // デフォルト値
        windSpeed: 0, // デフォルト値
      };

      // WeatherService に追加
      this.weatherService.addWeather(newWeather);

      // 入力フォームをリセット
      this.newCity.set('');
      this.newTemperature.set(0);
      this.newCondition.set('');
    }
  }

  onUpdateTemperature(id: number, temperature: number): void {
    this.weatherService.updateTemperature(id, temperature);
  }

  // 選択状態の確認
  isSelected(id: number): boolean {
    return this.selectedWeatherId() === id;
  }
}
