import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Response } from 'src/app/dashboard/interfaces/response'
import { DeleteConfirmationComponent } from 'src/app/dashboard/modals/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {

  brands: any;
  flag1: string;
  flag2: string;
  res:Response
  constructor(private brandSer:BrandsService,public dialog: MatDialog,private route : Router) { }

  ngOnInit() {
    //gET BRANDS 
    this.flag1 = "addBrand" ; 
    this.flag2 = "editBrand";
    this.getBrands()
    // this.brands = [{id:1,name:'toyta',logo:'assets/images/sundown.jpg'},{id:2,name:'hyndai',logo:'assets/images/sundown.jpg'},{id:3,name:'skoda',image:'assets/images/sundown.jpg'}]
  }
  getBrands(){
    this.brandSer.getBrands().subscribe(res=>{
      this.brands = res.data ;
      console.log(this.brands)
      // var imageBase64 = "image base64 data";
      // var blob = new Blob([imageBase64], {type: 'image/png'});
    });
  }
  // DELETE Brand
  deleteBrand(id){
    console.log(id)
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      data: {id: id, delete:"brand" }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getBrands()
        console.log('The dialog was closed');
    }); 
  }
  //SHOW BRAND MODEL
  showModels(id,name){
    console.log(id)
    this.route.navigate(["/models",id])
  }

}
