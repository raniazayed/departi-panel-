import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentalUrlService } from './environmental-url.service';
import { Response } from 'src/app/dashboard/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class PartsService {
  baseIp: any;

  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }  // ADD AREA
  addPart(form){
    return this.http.post(`${this.baseIp}/parts`,form)
  }
  //DELET AREA
  deletePartslList(id){
    return this.http.delete(`${this.baseIp}/parts/${id}`)
  }
  //GET parts
  getParts(){
    return this.http.get<Response>(`${this.baseIp}/parts`)
  }
   //GET specific parts
   getSpecificParts(id){
    return this.http.get<Response>(`${this.baseIp}/parts/${id}`)
  }
  //edIT parts
  editPart(form,id){
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json",
      "X-Requested-With":  "XMLHttpRequest"
    });
    return this.http.put(`${this.baseIp}/parts/${id}`,form,{"headers":headers})
  }
 
  //GET MODELS
  getModels(id){
    return this.http.get(`${this.baseIp}/brands/${id}/models`)
  }
}
