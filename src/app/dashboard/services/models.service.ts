import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentalUrlService } from './environmental-url.service';
import { Response } from 'src/app/dashboard/interfaces/response'
import { ModelsResponse } from '../interfaces/models-response';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  baseIp: any;

  constructor(private http: HttpClient, private environmentser: EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
  }
  //GET BRANDS DROPSOWN
  getBrands() {
    return this.http.get(`${this.baseIp}/brands`)
  }
  //SEND MODEL FORM TOBACKEND
  addModel(form) {
    console.log(form.name)
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    return this.http.post(`${this.baseIp}/carmodels`, form, { "headers": headers })
  }

  getModels() {
    return this.http.get<Response>(`${this.baseIp}/carmodels`)
  }

  //DELET MODEl
  deleteModelList(id) {
    return this.http.delete(`${this.baseIp}/carmodels/${id}`)
  }
  // GET SPECIFIC MODEL BY ID
  getModel(id) {
    return this.http.get<ModelsResponse>(`${this.baseIp}/brands/${id}/carmodels`)
  }
  // GET SPECIFIC MODEL BY ID
  getSpecificModel(id) {
    return this.http.get<Response>(`${this.baseIp}/carmodels/${id}`)
  }
  //edIT Model
  editModel(form, id) {
    console.log(form, id)
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json"
    });
    return this.http.put(`${this.baseIp}/carmodels/${id}`, form, { "headers": headers })
  }
  //get car years
  getYears(id) {
    return this.http.get<ModelsResponse>(`${this.baseIp}/carmodels/${id}`)
  }
}
