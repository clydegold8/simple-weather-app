import { Component, OnInit } from '@angular/core';
import { CompleteUserDetails } from 'src/app/models/userinfo';

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
      }
    });
  }
}
