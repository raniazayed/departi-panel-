import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ModelsService } from 'src/app/dashboard/services/models.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { PartsService } from 'src/app/dashboard/services/parts.service';
import { Response } from 'src/app/dashboard/interfaces/response'

@Component({
  selector: 'app-part-form',
  templateUrl: './part-form.component.html',
  styleUrls: ['./part-form.component.scss']
})
export class PartFormComponent implements OnInit {

  partsForm: FormGroup;
  brands: any
  default: any = ""
  id: any;
  flag: any;
  res: Response
  parts: any[];
  modelist: any;
  part: any;
  brandName: any;
  modelName: any;
  constructor(private modelsSer: ModelsService, private route: ActivatedRoute, private brandSer: BrandsService, private router: Router, private partsSer: PartsService) { }

  ngOnInit() {
    this.partsForm = new FormGroup({
      brand_id: new FormControl(null, [Validators.required]),
      carmodel_id: new FormControl(null, [Validators.required]),
      part_no: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      weight: new FormControl(null),
      width: new FormControl(null),
      depth: new FormControl(null),
      height: new FormControl(null)
    });

    // this.modelsForm.controls['brandName'].setValue(this.default, {onlySelf: true});
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params.flag1)
    //GET parts
    this.getParts()
    this.getBrands();

    if (this.flag == "editPart") {
      this.partsSer.getSpecificParts(this.id).subscribe(res=>{
        this.part = res.data;
        console.log(this.part)
        this.brand_id.setValue(this.part.brand_id)
        this.part_no.setValue(this.part.part_no)
        this.name.setValue(this.part.name)
        this.weight.setValue(this.part.weight)
        this.width.setValue(this.part.width)
        this.depth.setValue(this.part.depth)
        this.height.setValue(this.part.height)
        this.partsForm.controls["carmodel_id"].setValue(this.part.carmodel_id);
        this.modelsSer.getModel(this.brand_id.value).subscribe(
          res => {
            this.modelist = res.data;
            this.modelName=this.modelist.filter(elem=>{
              if(elem==this.carmodel_id.value){
                return elem
              }
            })
            console.log(this.modelist)
          }
        );

      })
    }
    // this.brands = [{id:1, name : "toyta"}, {id:2, name : "hynday"}] ;
    // this.modelist = [{id:1,name:"picanto"}] 
   
  }
  // GET BRANDS
  getBrands(){
    this.brandSer.getBrands().subscribe(res => {
      this.brands = res.data;
      console.log(this.brand_id.value);
      this.brandName=this.brands.filter(elem=>{
        if(elem.id==this.brand_id.value){
          return elem
        }
      })[0].name
      console.log(this.brandName)
      this.modelsSer.getModel(this.brand_id.value).subscribe(
        res => {
          this.modelist = res.data;
          console.log(this.modelist,this.carmodel_id.value)
          this.modelName=this.modelist.filter(elem=>{
            if(elem.id==this.carmodel_id.value){
              return elem
            }
          })[0].name
          console.log(this.modelName)
        }
      ); 
      console.log(this.brands)
    });
  }
  //GET PARTS
  getParts(){
    this.partsSer.getParts().subscribe(res => {
      this.parts = res.data;
      console.log(this.parts)
    });
  }
  numberChek(control: AbstractControl): ValidationErrors | null {
    const pattdig = new RegExp('^[0-9]+$');
    console.log(control.value)
    if (pattdig.test(control.value) == true) {
        return null; //valid
    } else {
      return { numbererror: true } //non-valid
    }
  }
   //GET models OF SPECIFIC brand
   onChangeBrand(brandId){
    console.log(brandId)
    if (brandId) {
      console.log(brandId)
      this.modelsSer.getModel(brandId).subscribe(
        res => {
          this.modelist = res.data;
          console.log(this.modelist)
        }
      );
    } else {
      this.modelist = null;
    }
  }
  get brand_id() {
    return this.partsForm.get("brand_id");
  }
  get carmodel_id() {
    return this.partsForm.get("carmodel_id");
  }
  get weight() {
    return this.partsForm.get("weight");
  }
  get width() {
    return this.partsForm.get("width");
  }
  get depth() {
    return this.partsForm.get("depth");
  }
  get height() {
    return this.partsForm.get("height");
  }
  get  part_no() {
    return this.partsForm.get("part_no");
  }
  get name() {
    return this.partsForm.get("name");
  }
  //CHECK DATE 
  dateCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');
    console.log("date not valid")
    console.log(control.value)
    if (pattdig.test(control.value) == true) {
      console.log(control.value.toString().length)
      if (control.value.toString().length !== 4) {
        console.log("not 4")
        return { 'dateerror': true } //non-valid
      }
      else if (control.value.toString().length == 4 && control.value <= 2050 && control.value >= 1900) {
        console.log(control.value)
        return null; //valid
      }
    } else {
      return { 'dateerror': true } //non-valid
    }
  }
  //SUBMIT FORM
  onSubmit(form) {

    console.log(form.value)

    if (this.flag == "editPart") {
      // Edit part FORM
      console.log(this.id)
      console.log("editpart")
      this.partsSer.editPart(form.value, this.id).subscribe(data => {
        console.log(data)
        this.router.navigate(["/parts"])
      });
    } else {
      console.log("addpart");
      if(form.value.depth==null){
        form.value.depth = 0;
      }
      if(form.value.height==null){
        form.value.height = 0;
      }
      if(form.value.weight==null){
        form.value.weight = 0;
      }
      if(form.value.width==null){
        form.value.width = 0;
      }
      if(form.value.part_no==null){
        form.value.part_no = '';
      }
      console.log(form.value)
      this.partsSer.addPart(form.value).subscribe(data => {
        console.log(data)
        this.router.navigate(["/parts"])
      });
    }
  }

}
