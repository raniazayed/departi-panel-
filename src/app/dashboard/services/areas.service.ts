import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentalUrlService } from './environmental-url.service';
import { Response } from 'src/app/dashboard/interfaces/response'


@Injectable({
  providedIn: 'root'
})
export class AreasService {
  baseIp: string;

  constructor(private http:HttpClient, private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;

   }
  // ADD AREA
  addArea(form){
    console.log(form)
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json"
    });
    return this.http.post(`${this.baseIp}/areas`,form,{"headers":headers})
  }
  //GET ALL AREAS
  getAllAreas(){
    return this.http.get<Response>(`${this.baseIp}/areas`)
  }
  //DELET AREA
  deleteAreaslList(id){
    console.log(id)
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json"
    });
    return this.http.delete(`${this.baseIp}/areas/${id}`,{"headers":headers})
  }
  //GET AREAS
  
  // getAreas(id){
  //   return this.http.get(`${this.baseIp}/cities/${id}/areas`)
  // }
  getAreas(id){
    return this.http.get<Response>(`${this.baseIp}/cities/${id}/areas`)
  }
  //edIT AREa
  editArea(form,id){
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json"
    });
    return this.http.put(`${this.baseIp}/areas/${id}`,form,{"headers":headers})
  }
  //GET SPECIFIC AREA
  getArea(id){
    return this.http.get<Response>(`${this.baseIp}/areas/${id}`)

  }
}
