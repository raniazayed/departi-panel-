import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelsService } from '../../services/models.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm, AbstractControl, ValidationErrors, NG_VALIDATORS, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { Response } from 'src/app/dashboard/interfaces/response'
import { DeleteConfirmationComponent } from 'src/app/dashboard/modals/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: ModelsListComponent, multi: true }
  ]
})
export class ModelsListComponent implements OnInit {
  modelList: any;
  private cities: Array<any> = [];
  private newAttribute: any = {};
  modelForm: FormGroup;
  res: Response
  brands: any[];
  editable: boolean;
  flagBtn: boolean = true;errMessage: string;
  flag1: string;
  flag2: string;
  id: any;
;
  editId: any;
  constructor(private modelSer: ModelsService, public dialog: MatDialog, private route: Router, private router:ActivatedRoute,private brandSer: BrandsService) { }

  ngOnInit() {
    // this.modelList = [{id:1, name:"picanto",from :1995,to:2009},{id:2,  name:"picanto",from :1995,to:2009}];
    // this.brands=[{id:1,name:"kia"},{id:2,name:"toyta"}]
    this.flag1 = "addModel";
    this.flag2 = "editModel";
    this.id = this.router.snapshot.params.id;
    console.log(this.id)
    // this.brandSer.getBrands().subscribe(res => {
    //   this.brands = res.data;
    //   console.log(this.brands)
    //   // for (var i = 0; i < this.brands.length; i++) {
    //   //   this.modelForm.controls['brand_id'].setValue(this.brands[i].id)
    //   // }
    // })
    this.modelForm = new FormGroup({
      brand_id: new FormControl({ value: "", disabled: true }, [Validators.required]),
      name: new FormControl({ value: "", disabled: true }, [Validators.required]),
      from: new FormControl({ value: "", disabled: true }, [Validators.required, this.dateCheck]),
      to: new FormControl({ value: "", disabled: true }, [Validators.required])
    });
    this.getModels()
  }
  getModels() {
    this.modelSer.getModel(this.id).subscribe(res => {
      this.modelList = res.data;
      console.log(this.modelList)
      // for (var i = 0; i < this.modelList.length; i++) {
      //   console.log(this.modelList[i].name)
      //   this.name.setValue(this.modelList[i].name);
      //   console.log(this.modelForm.controls['name'])
      //   this.modelForm.controls['from'].setValue(this.modelList[i].from)
      //   this.modelForm.controls['to'].setValue(this.modelList[i].to)
      // }
    })
  }
  get brand_id() {
    return this.modelForm.get("brand_id");
  }
  get name() {
    return this.modelForm.get("name");
  }
  get from() {
    return this.modelForm.get("from");
  }
  get to() {
    return this.modelForm.get("to");
  }
  // DELETE ModelList
  deleteModelList(id) {
     
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    width: '500px',
    data: {id: id, delete:"brandmodels" }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getModels()
    console.log('The dialog was closed');
  }); 
    // this.modelSer.deleteModelList(id).subscribe(data => {
    //   console.log(data);
    //   this.getModels()
    // })
  }
  //ADD Model
  addModelList() {
    this.modelList.push(this.newAttribute)
    this.newAttribute = {};
    console.log(this.modelList)
  }

  //CHECK DATE 
  dateCheck(control: AbstractControl): ValidationErrors | null {
    const pattdig = new RegExp('^[0-9]+$');
    console.log("date not valid")
    console.log(control.value)
    if (pattdig.test(control.value) == true) {
      console.log(control.value.toString().length)
      if (control.value.toString().length !== 4) {
        console.log("not 4")
        return { dateerror: true } //non-valid
      }
      else if (control.value.toString().length == 4 && control.value <= 2050 && control.value >= 1900) {
        console.log(control.value)
        return null; //valid
      }
    } else {
      return { dateerror: true } //non-valid
    }
  }
  //check date
  checkErr(startDate, endDate) {
    console.log(startDate)
    this.errMessage = '';
    const curDate = new Date().getFullYear();

    if (startDate.value > endDate.value) {
      this.errMessage = 'End Date should be greate than start date';
      return false;
    }
  }
  editModellList(id) {
    console.log(id)
    this.editable = true;
    this.flagBtn = false;
    console.log(document.getElementsByClassName(id))

    // for ( var i = 0; i < document.getElementsByTagName("select").length; i++) {
    //   (document.getElementsByTagName("select")[i] as any).disabled = false;
    // }
    for (var i = 0; i < document.getElementsByClassName(id).length; i++) {
      (document.getElementsByClassName(id)[i] as any).disabled = false;
    }
    this.editId = id;
    console.log(document.getElementById(id))
  }
  onSubmit(form: NgForm) {
    console.log(form.controls.to)
    for (var i = 0; i < document.getElementsByClassName(this.editId).length; i++) {
      (document.getElementsByClassName(this.editId)[i] as any).disabled = true;
    }
    // for ( var i = 0; i < document.getElementsByTagName("select").length; i++) {
    //   (document.getElementsByTagName("select")[i] as any).disabled = true;
    // }  
    this.editable = false;
    console.log(form.value)
    if (this.flagBtn == true) {
      console.log("addModel")
      // this.modelSer.addModel(form).subscribe(data=>{
      //   console.log(data)
      // });
    } else {

      console.log(form.value, this.editId)
      console.log("editModel")
      this.modelSer.editModel(form.value, this.editId).subscribe(data => {
        console.log(data)
      })

    }



  }
}
