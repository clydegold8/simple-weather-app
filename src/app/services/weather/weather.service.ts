import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { keysToCamel } from '../../utils/keys-to-camel';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }

  private userURL = 'https://api.open-meteo.com/v1/forecast?current_weather=true&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=auto&';

  public getWeather(lat:number, long:number, currentDate: string): Observable<any> {
    return this._http.get(this.userURL+`&latitude=${lat}&longitude=${long}&start_date=${currentDate}&end_date=${currentDate}`).pipe(
      map((res: any) => {
        const convertedData = keysToCamel(res);
        return convertedData;
      }),
      catchError(err => { throw 'error loading weather' + err; }));
  }

  public getWeatherDescriptionsData(): Observable<any>{
    return this._http.get('./assets/weather-descriptions.json').pipe(map((res: any) => {
      return res;
    }),
    catchError(err => { throw 'error loading weather descriptions' + err; }));
  }
}
