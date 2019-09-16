import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ModelsService } from './../../services/models.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { ModelsResponse } from 'src/app/dashboard/interfaces/models-response';

@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss']
})
export class ModelFormComponent implements OnInit {

  modelsForm: FormGroup;
  brands: any
  id: any;
  flag: any = true;
  res: ModelsResponse;
  errMessage: string = ""
  model: any;
  flag1: any;
  redirectUrl: string;
  brandName: any;
  years: {}[] = []
  editBtn: boolean=true;
  from_to:any
  inputValue: any;
  yearsDesign: any=[{'from':'','to':''}];
  formValue: {};
  constructor(private modelsSer: ModelsService, private route: ActivatedRoute, private brandSer: BrandsService, private router: Router) { }

  ngOnInit() {
    this.modelsForm = new FormGroup({
      brand_id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      from: new FormControl(null, [Validators.required, this.dateCheck]),
      to: new FormControl(null, [Validators.required, this.dateCheck])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag1 = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params, this.route.snapshot.params.flag1)
    this.redirectUrl = this.router.url;
    console.log(this.redirectUrl, this.route.snapshot.params)
    if (this.redirectUrl.includes("/brand")) {
      this.flag = false;
      console.log(this.flag);
      this.brand_id.setValue(this.id)
      console.log(this.brand_id)
    }
    if (this.flag1 == "editModel") {
      this.model={id:1,brand_id:2,name:'ggg',from_to:[{'from':2000,'to':2003},{'from':2004,'to':2005},{'from':2008,'to':2010}]}
      this.years = this.model.from_to;
      this.yearsDesign = this.model.from_to;
        this.brand_id.setValue(this.model.brand_id)
        this.name.setValue(this.model.name);
        this.model.from_to.map(element => {
          console.log(element)
          this.from.setValue(element.from)
          this.to.setValue(element.to)
     });

        console.log(this.model.brand_id)
      this.modelsSer.getSpecificModel(this.id).subscribe(res => {
        this.model = res.data;
        console.log(this.model)
        
        this.brandSer.getSpecificBrand(this.model.brand_id).subscribe(res => {
          this.brandName = res.data;
          console.log(this.brandName.name)
        })
      })
    }

    //GET BRANDS
    // this.brands = [{id:1, name:"kia"},{id:2, name:"toyta"}] ; 

    this.brandSer.getBrands().subscribe(res => {
      this.brands = res.data;
      console.log(this.brands)
    });


  }
  get brand_id() {
    return this.modelsForm.get("brand_id");
  }
  get name() {
    return this.modelsForm.get("name");
  }
  get from() {
    return this.modelsForm.get("from");
  }
  get to() {
    return this.modelsForm.get("to");
  }
  //CHECK DATE 
  dateCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');
    if (pattdig.test(control.value) == true) {
      if (control.value.toString().length !== 4) {
        return { 'dateerror': true } //non-valid
      }
      else if (control.value.toString().length == 4 && control.value >= 1900 && control.value < new Date().getFullYear() + 30) {
        console.log(control.value > 1900)
        console.log(new Date().getFullYear() + 30)
        console.log("4 nums")
        return null; //valid
      }
      else {
        return { 'dateerror': true } //non-valid
      }
    } else {
      return { 'dateerror': true } //non-valid
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
  //add RANGE OF YEARS
  addRange(id) {
    console.log("add range")
    console.log(id)
    console.log(this.modelsForm.value)
    // this.inputValue=''
    this.yearsDesign.push({'from':'','to':''})
  }
  submitRange(id,data){
    this.editBtn=true;
    // debugger;
    console.log(data)
    for (var i = 0; i < document.getElementsByClassName(id).length; i++) {
      (document.getElementsByClassName(id)[i] as any).disabled = true;
    }
    if(data=='edit'){
      // debugger
      console.log(id,"edit")
      console.log(this.years)

      // this.years.filter(elem=>{
      //   if()
      // })
      console.log(this.years)
      this.from_to ={"from":this.modelsForm.value.from,"to":this.modelsForm.value.to} ;
      this.years.push(this.from_to)
      this.years.slice(id)

    // this.years.splice(id,this.years.length-1)
    console.log(this.years)
    }
    if(data=='add'){
      console.log('add')
      this.from_to ={"from":this.modelsForm.value.from,"to":this.modelsForm.value.to} ;
      console.log(this.from_to)
      this.years.push(this.from_to)
      console.log(this.years)
      console.log(this.yearsDesign)
    }

  }
  editRange(id){
    console.log(id)
    for (var i = 0; i < document.getElementsByClassName(id).length; i++) {
      (document.getElementsByClassName(id)[i] as any).disabled = false;
    }
    
    this.editBtn=false;
    this.from_to ={"from":this.modelsForm.value.from,"to":this.modelsForm.value.to} ;

    // this.years.push( this.from_to)
    // this.years.splice(id,this.years.length-1)
    console.log(this.years)
  }
  deleteRange(id,data){
    console.log(id,this.years);
    // this.years.slice(id)
    if(data='add'){
      this.years.splice(id,1)
      this.yearsDesign.splice(id,1)
      console.log(this.years)
    }
  }
  // @ViewChild("modelsForm", { static: false }) modelsForm: FormGroup;
  //SUBMIT FORM
  onSubmit(form) {
    console.log(form);
    console.log(this.years)
    this.formValue={'brand_id':form.value.brand_id,'name':form.value.name,'from_to':this.years}
    console.log(this.formValue)
    if (this.flag1 == "editModel") {
      // Edit BRAND FORM
      console.log("editModel")
      console.log(this.formValue,form.value)
      this.modelsSer.editModel(form.value, this.id).subscribe(data => {
        console.log(data)
        if (this.flag == true) {
          console.log("models")
          this.router.navigate(['/models'])
        } else {
          this.router.navigate(["/brand", form.value.brand_id, 'models'])
        }
      });
    } else {

      this.modelsSer.addModel(this.formValue).subscribe(data => {
        console.log(data)
        if (this.flag == true) {
          console.log("models")
          this.router.navigate(['/models'])
        } else {
          this.router.navigate(["/brand", form.value.brand_id, 'models'])
        }
      });

    }
  }
}


