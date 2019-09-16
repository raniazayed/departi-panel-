import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationForm } from '../interfaces/location-form';
import { EnvironmentalUrlService } from './environmental-url.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseIp: string;

  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   } 
  getLocations(){
    return this.http.get(`${this.baseIp}/locations`)
  }

  deleteLocation(id){
    return this.http.delete(`${this.baseIp}/locations/${id}`)
  }
  //ADD LOCATION
  addLocation(form){
    return this.http.post(`${this.baseIp}/locations`, form)
  }
  //EDIT LOCATION
  editLocation(form,id){
    return this.http.post(`${this.baseIp}/locations/${id}`,form)
  }
  //GET CITEIS DROPDOWN LIST
  getCities(){
    return this.http.get(`${this.baseIp}/cities`)
  }
  //GET AREAS DROPDOWN LIST
  getAreas(id){
    return this.http.get(`${this.baseIp}/areas/${id}`)
  }
  getLocationData(){
    return this.http.get<LocationForm>(`${this.baseIp}/locations`)
  }
}
