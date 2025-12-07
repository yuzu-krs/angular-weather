import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root', // アプリ全体で使えるサービスとして提供
})
export class WeatherService {
  // weatherData: Weather 配列を保持する signal
  private weatherData = signal<Weather[]>([
    { id: 1, city: '東京', temperature: 30, condition: '晴れ', humidity: 50, windSpeed: 10 },
    { id: 2, city: '大阪', temperature: 28, condition: '曇り', humidity: 60, windSpeed: 12 },
    { id: 3, city: '名古屋', temperature: 27, condition: '雨', humidity: 70, windSpeed: 8 },
    { id: 4, city: '福岡', temperature: 26, condition: '晴れ', humidity: 55, windSpeed: 9 },
  ]);

  // コンポーネントはこの signal を直接購読
  get weatherList() {
    return this.weatherData;
  }

  // 配列に新しい天気を追加
  addWeather(weather: Weather): void {
    this.weatherData.update((list) => [...list, weather]);
  }

  // 指定 id の天気を削除
  deleteWeather(id: number): void {
    // weatherData は signal<Weather[]> です。
    // update() メソッドは signal の現在の値を引数として受け取り、
    // その値を加工して新しい値を返す関数を渡すことができます。
    this.weatherData.update(
      (list) =>
        // list は現在の Weather[] 配列
        // filter() は配列のメソッドで、
        // 条件に合う要素だけを残した新しい配列を返します
        list.filter((item) => item.id !== id)
      // item.id が削除したい id と違うものだけ残す
      // → 結果的に id が一致する要素は削除される
    );
  }
}
