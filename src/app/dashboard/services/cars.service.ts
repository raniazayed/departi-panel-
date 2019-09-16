import { Injectable } from '@angular/core';
import { EnvironmentalUrlService } from './environmental-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarsResponse } from '../interfaces/cars-response';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  baseIp: string;

  constructor(private http: HttpClient, private environmentser: EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
  }
  getCars() {
    return this.http.get<CarsResponse>(`${this.baseIp}/cars`)
  }
  deleteCars(id){
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json"
    });
    return this.http.delete(`${this.baseIp}/cars/${id}`,{"headers":headers})
  }
//GET SPECIFIED CAR
getSpecifiedCar(id){
  return this.http.get<CarsResponse>(`${this.baseIp}/cars/${id}`)
}
// ADD CAR
addCar(form){
  return this.http.post(`${this.baseIp}/cars`,form)
}
//EDIT CAR 
editCar(form,id){
  return this.http.put(`${this.baseIp}/cars/${id}`, form)

}
}
