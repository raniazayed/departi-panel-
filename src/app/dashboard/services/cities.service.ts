import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/dashboard/interfaces/response'
import { EnvironmentalUrlService } from './environmental-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  baseIp: any;
 

  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }
  //ADD CITY 
  addCity(form) {
    return this.http.post(`${this.baseIp}/cities`, form)
  }
  //GET CITIES LIST
  getCities() {
    return this.http.get<Response>(`${this.baseIp}/cities`)
  }
  //DELETE CITY
  deletecitieslList(id) {
    return this.http.delete(`${this.baseIp}/cities/${id}`)
  }2
  //edIT CITY
  editCity(form, id) {
    return this.http.put(`${this.baseIp}/cities/${id}`, form)
  }
  getSpecificCity(id){
    return this.http.get<Response>(`${this.baseIp}/cities/${id}`)
  }
  private handleError (error: Response | any) {
    return Observable.throw(error.code);
}
}
