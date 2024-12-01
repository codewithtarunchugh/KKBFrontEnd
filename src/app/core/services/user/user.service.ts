import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { APIConstant } from '../../constants/APIConstant';
import { RefreshToken } from '../../Models/classes/User';
import { ILogin } from '../../Models/interfaces/ILogin';
import { IUserResponse } from '../../Models/interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public $RefreshToken = new Subject<boolean>();
  public $RefreshTokenReceived = new Subject<boolean>();

  constructor(private master: MasterService) {
    this.$RefreshToken.subscribe((value) => {
      if (value) {
        let refreshTokenObj: RefreshToken = {
          jwtToken: localStorage.getItem('jwtToken') ?? '',
          refreshToken: localStorage.getItem('refreshToken') ?? '',
        };
        this.getRefreshToken(refreshTokenObj);
      }
    });
  }
  // ngOnDestroy(): void {
  //   this.$RefreshToken.unsubscribe();
  // }
  login(loginObj: ILogin): Observable<any> {
    return this.master.post(environment.api + APIConstant.user.login, loginObj);
  }
  getRefreshToken(RefreshTokenObj: RefreshToken) {
    this.master
      .post(environment.api + APIConstant.user.refreshToken, RefreshTokenObj)
      .subscribe((result) => {
        localStorage.setItem(
          'jwtToken',
          result.jwtToken == null ? '' : result.jwtToken
        );
        localStorage.setItem(
          'refreshToken',
          result.refreshToken == null ? '' : result.refreshToken
        );
        this.$RefreshTokenReceived.next(true);
      });
  }
  IsLoggedIn() {
    return localStorage.getItem('jwtToken') != null;
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }
  getUserName() {
    let name: string = 'Guest';
    const localData = localStorage.getItem('userData');
    if (localData != null) {
      let userResponse: IUserResponse = JSON.parse(localData);
      name = userResponse.name ?? '';
    }
    return name;
  }
  getToken() {
    const jwt = localStorage.getItem('jwtToken');
    return jwt != null ? jwt : '';
  }
  getRoleFromToken() {
    const jwt = this.getToken();
    if (jwt != null || jwt != '') {
      let _token: string | undefined;
      _token = jwt?.split('.')[1];
      //console.log("jwt" + JSON.parse(atob(_token)).role);
      return JSON.parse(atob(_token)).role;
    }
    return '';
  }
  getRoleFromStorage() {
    let role: string = '';
    const localData = localStorage.getItem('userData');
    if (localData != null) {
      let userResponse: IUserResponse = JSON.parse(localData);
      role = userResponse.roles[0] ?? '';
    }
    return role;
  }
}
