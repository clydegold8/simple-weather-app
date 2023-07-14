import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CompleteUserDetails, UserInfo, WeatherInfo, WeatherState } from 'src/app/models/userinfo';
import { UserService } from 'src/app/services/user/user.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { formatDate } from '@angular/common';
import * as L from "leaflet";
import {MatSnackBar} from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.less']
})
export class UserinfoComponent implements OnInit {

  constructor( private _userSvc: UserService, private _weatherSvc: WeatherService, private _snackBar: MatSnackBar ) {}

  public userDetails: CompleteUserDetails[] = [];
  public isLoading = true;
  public isDay = false;
  public weatherState:any;
  public weatherDetail:any;
  public countryFlag: string = '';
  public maxTemp = 0;
  public minTemp = 0;
  public isLoadingSave = false;
  public isUserSaved = false;
  public options: any;
  public layers: any;

  ngOnInit(): void {
      this._userSvc.getUser().pipe(untilDestroyed(this))
      .subscribe((res:any) => {
        res.results.map(async (userInfo: UserInfo) => {
          const currentDate = formatDate(Date.now(),'yyyy-MM-dd','en-US');
          await this._weatherSvc.getWeather(+userInfo.location.coordinates.latitude, +userInfo.location.coordinates.longitude,currentDate).pipe(untilDestroyed(this))
          .subscribe(async (weatherData: WeatherInfo) => {
            await this._weatherSvc.getWeatherDescriptionsData().pipe(untilDestroyed(this)).subscribe(async (weatherDescriptions) => {
              this.userDetails.push({userInfo:userInfo,weatherInfo:weatherData});
              this.isDay = Boolean(weatherData.currentWeather.isDay);
              this.isLoading= false;
              weatherDescriptions.map((weatherDetail: any) => {
                this.weatherDetail = weatherDetail;
                this.weatherState = weatherDetail[weatherData.currentWeather.weathercode][this.isDay? 'day' : 'night'];
              });
              weatherData.daily.temperature2mMax.map((maxTemp) => {
                this.maxTemp = maxTemp;
              });
              weatherData.daily.temperature2mMin.map((minTemp) => {
                this.minTemp = minTemp;
              });
              await this._userSvc.getCountryFlag().pipe(untilDestroyed(this)).subscribe((countryData) => {
                countryData.map((flagData: any) => {
                  if(flagData.name === userInfo.location.country){
                    this.countryFlag = flagData.image;
                  }
                });
                this.getMapOptions();
              });
            });
          });
        });
      });
  }

  public getMapOptions() {
    this.userDetails.map((data) => {
      this.options = {
        layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...' })],
        zoom: 5,
        center: L.latLng(+data.userInfo.location.coordinates.latitude, +data.userInfo.location.coordinates.longitude)
      }

      this.layers = [
          L.marker([ +data.userInfo.location.coordinates.latitude, +data.userInfo.location.coordinates.longitude ], {
              icon: L.icon({
                iconSize: [38, 38],
                iconAnchor: [13, 13],
                iconUrl: data.userInfo.picture.medium
              })
          })
      ]
    });
  }

  public saveUserDetails(userData: CompleteUserDetails[]){
    this.isLoadingSave = true;
    setTimeout(() => {
      userData.map((data) => {
        data.otherInfo = {
          countryFlag: this.countryFlag,
          weatherStateDescription: this.weatherState.description,
          weatherStateImage: this.weatherState.image,
          maxTemp: this.maxTemp,
          minTemp: this.minTemp,
          weatherStateList: this.weatherDetail,
          isDay: this.isDay,
          mapConfig: {}
        }
      });
      const userDetailStr = localStorage.getItem('userDetailArr');
      if(userDetailStr){
        const userDetailArr = JSON.parse(userDetailStr);
        userData.map((data) => {
          userDetailArr.push(data);
        });
        localStorage.setItem('userDetailArr', JSON.stringify(userDetailArr));
      }else{
        localStorage.setItem('userDetailArr', JSON.stringify(userData));
      }
      console.info('Saved Userinfo');
      this.isLoadingSave = false;
      this.isUserSaved = true;
      this._snackBar.open('User Saved', 'Close');
    }, 600);
  }
}
