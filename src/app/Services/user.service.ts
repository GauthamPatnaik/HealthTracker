import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserRequest } from '../Models/UserRequest';
import { AddUser } from '../Models/ServiceModels/AddUser';
import { UserResponse } from '../Models/UserResponse';
import { UserListResponse } from '../Models/ServiceModels/UserListResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  dataUrl: string = "/assets/api/";
  userRequest: UserRequest;

  constructor(public _http: HttpClient) {
    this.userRequest = new UserRequest();
    this.userRequest.UserId = Number(localStorage.getItem("userId"));
    //to fetch IP address
    this._http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.userRequest.IpAddress = res.ip;
    });
  }
  getHeaders() {
    var requestHeaders = new HttpHeaders();
    requestHeaders.append('Content-Type', 'application/json');

    return requestHeaders;
  }

  public addUserDetails(addUser: AddUser): Observable<UserResponse> {
    addUser.userRequest = this.userRequest;
    const headerDirect = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    return this._http.post<UserResponse>(this.dataUrl + "insert-data.php",
      JSON.stringify(addUser), { headers: headerDirect });
  }

  public fetchUserData(): Observable<UserListResponse> {
    const headerDirect = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    return this._http.post<UserListResponse>(this.dataUrl + "getAllUsers.php",
      { headers: headerDirect });
  }

  public testUserData(): Observable<UserListResponse> {
    const headerDirect = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
    return this._http.post<UserListResponse>(this.dataUrl + "testdata.json",
      { headers: headerDirect });
  }
}
