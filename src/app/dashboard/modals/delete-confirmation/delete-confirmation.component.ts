import { CarsService } from './../../services/cars.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartsService } from 'src/app/dashboard/services/parts.service';
import { Response } from 'src/app/dashboard/interfaces/response'
import { Router } from '@angular/router';
import { DeletedData } from 'src/app/dashboard/interfaces/deleted-data';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { CitiesService } from 'src/app/dashboard/services/cities.service';
import { AreasService } from 'src/app/dashboard/services/areas.service';
import { ModelsService } from 'src/app/dashboard/services/models.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  parts: any[];
  res:Response
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeletedData, private partsSer:PartsService, private router:Router,private brandSer:BrandsService, private citiesSer:CitiesService, private areasSer:AreasService, private modelsSer:ModelsService, private carsSer:CarsService) {
      console.log(data)
     }

  ngOnInit() {
  }
  //DELET 
  deletePartslList(){
    if(this.data.delete=="part"){
      this.partsSer.deletePartslList(this.data.id).subscribe(data => {
        console.log(data);
        this.closeModal()
      })
    }else if(this.data.delete=="brand"){
      this.brandSer.deleteBrand(this.data.id).subscribe(data=>{
        console.log(data)
        this.closeModal()
      })
    }else if(this.data.delete=="city"){
      this.citiesSer.deletecitieslList(this.data.id).subscribe(data=>{
        console.log(data);
        this.closeModal()

      })
    }else if(this.data.delete=="area"){
      console.log(this.data.id)
      this.areasSer.deleteAreaslList(this.data.id).subscribe(data => {
        console.log(data)
        this.closeModal()
      })
    }else if(this.data.delete=="allmodels"){
      this.modelsSer.deleteModelList(this.data.id).subscribe(data => {
        console.log(data);
        this.closeModal()

      })
    }else if(this.data.delete=="brandmodels"){
      this.modelsSer.deleteModelList(this.data.id).subscribe(data => {
        console.log(data);
        this.closeModal()
      })
    }else if(this.data.delete=="car"){
      this.carsSer.deleteCars(this.data.id).subscribe(data => {
        console.log(data);
        this.closeModal()
      })
    }
      
    
  }
  //DISMISS MODAL
  closeModal(){
    this.dialogRef.close('');
  }
}
