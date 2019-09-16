import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from './../../services/models.service';
import { Response } from 'src/app/dashboard/interfaces/response'
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { DeleteConfirmationComponent } from 'src/app/dashboard/modals/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  models: any[];
  // model: { id: number; brandName: string; brandModel: string; startDate: number; endDate: number; };
res:Response
  brand: any[];
  flag1: string;
  flag2: string;
  constructor(private route: ActivatedRoute,private modelsSer:ModelsService, private brandSer:BrandsService, public dialog: MatDialog) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    console.log(id);
    // this.models = [{id:1, name:"picanto",from :1995,to:2009},{id:2,  name:"picanto",from :1995,to:2009}];
    this.flag1 = "addModel";
    this.flag2 = "editModel"; 
   this.getModels()
    if(this.models){
      this.brandSer.getSpecificBrand(id).subscribe(res=>{
        this.brand = res.data;
        console.log(this.brand)
      })
    }
  }
  getModels(){
    this.modelsSer.getModels().subscribe(res=>{
      this.models = res.data;
      console.log(this.models);
    
    })
  }
 // DELETE ModelList
 deleteModelList(id) {
   
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    width: '500px',
    data: {id: id, delete:"allmodels" }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getModels()
        console.log('The dialog was closed');
  }); 
     
}}
