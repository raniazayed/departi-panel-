import { Year } from 'src/app/dashboard/interfaces/year';
export interface Models {
    id:number,
    brand_id:number,
    name:string,
    from_to:Array<Year>
}

