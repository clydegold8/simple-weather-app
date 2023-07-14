import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  private userURL = 'https://randomuser.me/api/?exc=login,registered,phone,cell,id,dob,nat';

  public getUser():  Observable<any> {
    return this.http.get(this.userURL).pipe(
      map((res) => {
        return res;
      }),
      catchError(err => { throw 'error loading users' + err; }));
  }

  public getCountryFlag(): Observable<any>{
    return this.http.get('./assets/country-flag-list.json').pipe(map((res: any) => {
      return res;
    }),
    catchError(err => { throw 'error loading country flag' + err; }));
  }

}
