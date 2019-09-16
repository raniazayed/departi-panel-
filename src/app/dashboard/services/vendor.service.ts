import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentalUrlService } from './environmental-url.service';
import { Response } from 'src/app/dashboard/interfaces/response'

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseIp: any;

  constructor(private http: HttpClient,private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }
    //SUBMIT VENDORFORM TO BACKEND
  submitVendorForm(form){
    return  this.http.post(`${this.baseIp}/vendors`,form)
  }

  //GETBRANDS
  getBrands(){
    return this.http.get<Response>(`${this.baseIp}/brands`)
  }
  //edIT CITY
  editVendors(form, id) {
    return this.http.put(`${this.baseIp}/vendors/${id}`, form)
  }
  getVendorList(){
    return this.http.get<Response>(`${this.baseIp}/vendors`)
  }
  
  editVendor(brandId,form){
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    return  this.http.put(`${this.baseIp}/vendors/${brandId}`,form)
  }
  // DELETE VENDOR
  deleteVendorList(id){
    return this.http.delete(`${this.baseIp}/vendors/${id}`)
  }
  // ADD VENDOR
  addVendor(form){
    return this.http.post(`${this.baseIp}/vendors`,form)
  }
}
