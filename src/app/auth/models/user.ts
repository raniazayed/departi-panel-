import { Injectable } from "@angular/core";

@Injectable()
export class User {
    id:number;
    email:string;
    name:string;
    phone:number;
    mobile:number;
    city_id:string;
    password:string;
    c_password:string;
}
