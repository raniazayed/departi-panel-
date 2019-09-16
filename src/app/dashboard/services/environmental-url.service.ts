import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentalUrlService {

  constructor() { }
  // public urlAddress: string = environment.urlAddress;
  baseIp =  'http://192.168.1.11:3000/api';
  // baseIp = 'http://35.238.221.128/backend/public/api'

}
