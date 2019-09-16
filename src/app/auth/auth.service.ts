import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EnvironmentalUrlService } from '../dashboard/services/environmental-url.service';
import { map } from "rxjs/operators";
import { Response } from 'src/app/dashboard/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseIp: any;
  constructor(private http: HttpClient, private environmentser: EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
  }
  //USER SIGN UP
  userSignUp(user) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseIp}/register`, user, { headers: headers })
      .pipe(
        map((response: Response) => response)
      )
  }
  //fleet SIGN UP
  fleetSignUp(fleet) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseIp}/register`, fleet, { headers: headers })
      .pipe(
        map((response: Response) => response)
      )
  }
  //vendor SIGN UP
  vendorSignUp(vendor) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseIp}/register`, vendor, { headers: headers })
      .pipe(
        map((response: Response) => response)
      )
  }
  //authenticate user
  isAuthenticated() {
    return (JSON.parse(localStorage.getItem('currentUser')) != null);
  }
  //GET ROLE
  getRole(){
    const user:any = localStorage.getItem('currentUser');
    if(user){
      if(JSON.parse(user).roleName != null){
        return JSON.parse(user).roleName;
      }
    }
  }
  // USER LOGIN
  login(email: string, password: string) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(`${this.baseIp}/users/login`, { email, password }, { "headers": headers })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log(user)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }
  // GET VENDOR DATA
  getVendorData(id) {
    return this.http.get<Response>(`${this.baseIp}/vendors/${id}`)
  }
  // UPDATE VENDOR DATA
  editVendorData(id, vendor) {
    return this.http.put<Response>(`${this.baseIp}/fleet/${id}`, vendor)
  }
  // UPDATE VENDOR DATA
  editFleetData(id, fleet) {
    return this.http.put<Response>(`${this.baseIp}/fleet/${id}`, fleet)
  }
  // UPDATE VENDOR DATA
  editUserData(id, user) {
    return this.http.put<Response>(`${this.baseIp}/fleet/${id}`, user)
  }
  // GET FLEET DATA
  getFleetData(id) {
    return this.http.get<Response>(`${this.baseIp}/fleet/${id}`)
  }
  // GET USER DATA
  getUserData(id) {
    return this.http.get<Response>(`${this.baseIp}/users/${id}`)
  }
  //CHECK LOGGED IN STATUS
  checkLoginStatus(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user != null) {
      return true;
    } else {
      return false;
    }

  }
  get isLoggedIn() {
    return this.checkLoginStatus();
  }

  // check if role match
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('currentUser')).roleName;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }
  // SAVE TOKEN AND ROLE NAME TO LOCAL STORAGE
  saveUserDataToLocalStorage(userObject) {
    localStorage.setItem('currentUser', JSON.stringify(userObject))
  }
  // USER LOGOUT
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
