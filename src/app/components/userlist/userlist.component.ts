import { Component, OnInit } from '@angular/core';
import { CompleteUserDetails } from 'src/app/models/userinfo';
import * as L from "leaflet";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserlistComponent implements OnInit {

  public userListDetails: CompleteUserDetails[] = [];
  public isEmptyList = true;
  public weatherTooltip = '';
  public weatherStateList: any;

  ngOnInit(): void {
    const userDetailStr = localStorage.getItem('userDetailArr');

    if(userDetailStr){
      const userDetailArr = JSON.parse(userDetailStr);
      this.userListDetails = userDetailArr;
      this.isEmptyList = userDetailArr.length === 0;
    }
    this.userListDetails.map((data) => {
      if(data.otherInfo){
        this.weatherTooltip = data.otherInfo.weatherStateDescription;
        this.weatherStateList = data.otherInfo.weatherStateList;

        data.otherInfo.mapConfig = {
              options: {
                layers: [L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...' })],
                zoom: 5,
                center: L.latLng(+data.userInfo.location.coordinates.latitude, +data.userInfo.location.coordinates.longitude)
              },
              layers: [
                  L.marker([ +data.userInfo.location.coordinates.latitude, +data.userInfo.location.coordinates.longitude ], {
                      icon: L.icon({
                        iconSize: [38, 38],
                        iconAnchor: [13, 13],
                        iconUrl: data.userInfo.picture.medium
                      })
                  })
              ]
        }
      }
    });
  }
}
