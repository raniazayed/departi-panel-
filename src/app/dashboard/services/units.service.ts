import { Injectable } from '@angular/core';
import { EnvironmentalUrlService } from './environmental-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnitsResponse } from '../interfaces/units-response';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  baseIp: string;
  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }
  getUnits(){
    return this.http.get<UnitsResponse>(`${this.baseIp}/units`)
  }
  //ADD NEW UNIT
  addUnit(form){
    return this.http.post(`${this.baseIp}/units`,form)
  }
  //EDIT UNIT
  editUnit(form,id){
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json",
      "X-Requested-With":  "XMLHttpRequest"
    });
    return this.http.put(`${this.baseIp}/units/${id}`,form,{"headers":headers})
  }
  //get specific unit 
  getSpecificUnit(id){
    return this.http.get<UnitsResponse>(`${this.baseIp}/units/${id}`)
  }
}
