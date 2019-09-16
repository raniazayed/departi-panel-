import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentalUrlService } from './environmental-url.service';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  baseIp: string;

  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }
  //GET FLEET LIST
  getFleetList(){
    return this.http.get('url/fleets')
  }
  // delete fleet 
  deleteFleetList(id){
    return this.http.delete(`url/fleets/${id}`)
  }
  //EDIT FLEET
  editFleet(brandId,form){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    return  this.http.put(`url/fleets/${brandId}`,form)
  }
 
  // ADD addFleet
  addFleet(form){
    return this.http.post('url/fleets',form)
  }
}
