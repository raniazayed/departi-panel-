import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { PartsService } from '../services/parts.service';
import { Response } from 'src/app/dashboard/interfaces/response'
import { BrandsService } from '../services/brands.service';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent implements OnInit {

  areas: any;
  flag1: string;
  flag2: string;
  flagBtn: boolean = true ;
  // areaNamee:any
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  areasForm: FormGroup;
  editable: boolean;
  newArray: any[];
  addArea = false;
  // parts: { id: number; partName: string; partNo: number; brandId: number; modelId: number; partDimension: number; partWeight: number; brandName: string; modelName: string; }[];
  // brands: { id: number; name: string; }[];
  // models: { id: number; name: string; }[];
  res:Response
  parts: any;
  brands: Object;
  models: Object;
  // area:object={}
  constructor(private route: Router, private router: ActivatedRoute,private partsSer:PartsService,private brandSer:BrandsService, public dialog: MatDialog) { }
  ngOnInit() {
    this.flag1 = "addPart";
    this.flag2 = "editPart";
    this.editable = false;
    // this.parts = [{ id: 1, name: "wheel",part_no:10,height:100,weight:100,depth:1,width:1},{ id: 1, name: "wheel",part_no:10,height:100,weight:10,depth:1,width:1}];
    this.brands = [{id:1,name:"kia"},{id:2,name:"toyta"}];
    this.models=[{id:1,name:"picanto"}]
    this.newArray = []
    //GET parts
    this.getParts()
    //GET BRANDS
    this.brandSer.getBrands().subscribe(res=>{
      this.brands = res.data;
      console.log(this.brands)
    })
    const id: string = this.router.snapshot.params.id;
    console.log(id);
  }
  getParts(){
    this.partsSer.getParts().subscribe(res=>{
      this.parts = res.data;
      console.log(this.parts)
    })
  }
 //GET models OF SPECIFIC BRAND
 onChangeBrand(brandId){
  console.log(brandId)
  if (brandId) {
    console.log(brandId)
    this.partsSer.getModels(brandId).subscribe(
      data => {
        this.models = data;
        console.log(this.models)
      }
    );
  } else {
    this.models = null;
  }
}
  // DELETE deleteAreaslList
  deletePartlList(id) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      data: {id: id, delete:"part" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getParts()
      console.log('The dialog was closed');
    });   
  }
  //ADD AREA
  addAreaValue() {
    console.log(this.newAttribute)
    this.parts.push(this.newAttribute)
    this.newAttribute = {}
    console.log(this.parts)
    this.editable = true;
    this.flagBtn = true;

  }

  editPartlList(id) {
    console.log(id)
    this.editable = true;
    this.flagBtn = false;


  }
  // submitAreaslList(id) {
    
  //   console.log(this.areaForm.value)
  //   this.editable = true;

  // }
  // @ViewChild("f", { static: false }) areaForm: NgForm;
  // onSubmit(form: NgForm) {
  //   this.editable = false;
  //   console.log(form.value)
  //   console.log(this.parts)
  //   if (this.flagBtn == true) {
  //     console.log("addModel")
  //     this.partsSer.addPart(form.value).subscribe(data=>{
  //       console.log(data)
  //     });
  //   } else {
  //     console.log("editModel")
  //     // this.partsSer.editPart(id).subscribe(data=>{
  //     //   console.log(data)
  //     // })
  //   }
  // }

}
