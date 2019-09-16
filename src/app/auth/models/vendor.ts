import { Injectable } from "@angular/core";

@Injectable()
export class Vendor {
    id:number;
    email:string;
    password:string;
    name:string;
    phone:number;
    mobile:number;
    city_id:string;
    Password:string;
    c_password:string;
    Brands:Array<number>;
    partstype:string;
    taxReferncePhoto:string;
    commercialRegisterPhoto:string
}
