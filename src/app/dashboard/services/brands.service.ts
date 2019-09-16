import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/dashboard/interfaces/response'
import { EnvironmentalUrlService } from './environmental-url.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseIp: string;

  constructor(private http : HttpClient, private environmentser:EnvironmentalUrlService) {
    this.baseIp = this.environmentser.baseIp;
   }

  getBrands(){
    return this.http.get<Response>(`${this.baseIp}/brands`)
  }
  getSpecificBrand(id){
    return this.http.get<Response>(`${this.baseIp}/brands/${id}`)
  }
  //edIT BRAND
  editBrand(form,brandId){
    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type" : "application/json",
      "X-Requested-With":  "XMLHttpRequest"
    });
    console.log(brandId)

    return  this.http.patch<Response>(`${this.baseIp}/brands/${brandId}`,form,{"headers":headers})
  }
  // DELETE BRAND
  deleteBrand(id){
    return this.http.delete(`${this.baseIp}/brands/${id}`)
  }
  // ADD BRAND
  addBrand(form){
    // const headers = new HttpHeaders({
    //   "Content-Type": "multipart/form-data",
    //   'Accept': 'application/json'
    // });
    // const headers = new HttpHeaders({
    //   'accept': 'multipart/form-data'
    // });
    // return this.http.post('http://192.168.1.19:3000/api/brands', formData)
     return this.http.post(`${this.baseIp}/brands`, form)

  }
  private handleError (error: Response | any) {
    return Observable.throw(error.code);
}
  // private handleError(error:HttpErrorResponse){
  //   if(error.error instanceof ErrorEvent){
  //     console.error('An error occured:',error.error.message)
  //   }else{
  //     console.error(`Backend returned code:${error.status},`+`body was:${error.error}`);
      
  //   }
  //   return throwError('something happened')
  // }
 
}
