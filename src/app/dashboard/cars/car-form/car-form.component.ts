import { Response } from './../../interfaces/response';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModelsService } from 'src/app/dashboard/services/models.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { CarsService } from 'src/app/dashboard/services/cars.service';
import { Models } from 'src/app/dashboard/interfaces/models';
import { Cars } from 'src/app/dashboard/interfaces/cars';
import { ModelsResponse } from 'src/app/dashboard/interfaces/models-response';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  modelist: Models;
  res: ModelsResponse
  id: any;
  flag: any;
  brands: any[];
  selectedImge: any;
  imageUrl: any;
  flag2: any;
  flag1: any;
  years: Models;
  carYears: any=[];
  car: Cars;
  constructor(private modelsSer: ModelsService, private route: ActivatedRoute, private brandSer: BrandsService, private carsSer: CarsService, private router:Router) { }
  carForm: FormGroup
  ngOnInit() {
    this.carForm = new FormGroup({
      brand_id: new FormControl(null, [Validators.required]),
      carmodel_id: new FormControl(null, [Validators.required]),
      from_to: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required]),
      vin: new FormControl(null),
      vin_image: new FormControl(null)
    });
    this.getBrands();
    this.id = this.route.snapshot.params.id;
    console.log(this.route.snapshot.params)
    this.flag = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params)
    this.flag1 = this.route.snapshot.params.flag1;
    this.flag2 = this.route.snapshot.params.flag2;
    // this.years = [{'from':2000,'to':2003},{'from':2004,'to':2005}]
 
  // this.car={id:2,user_id:1,brand_id:1,carmodel_id:1,from_to:2003,vin:123,vin_image:"assets/images/elrizk.png",brand_name:'kia',model_name:'picanto'}
    if(this.flag2=='editCar'){
      this.carsSer.getSpecifiedCar(this.id).subscribe(res=>{
        this.car = res.data;
        console.log(this.car);
        this.brand_id.setValue(this.car.brand_id)
        this.carmodel_id.setValue(this.car.carmodel_id)
        this.from_to.setValue(this.car.from_to)
        this.user_id.setValue(this.car.user_id)
        this.vin.setValue(this.car.vin)
        this.imageUrl = `http://192.168.1.11:3000/storage/brands/${this.car.vin_image}`
      })
    }
  
  }

  get brand_id() {
    return this.carForm.get("brand_id");
  }
  get carmodel_id() {
    return this.carForm.get("carmodel_id");
  }
  get from_to() {
    return this.carForm.get("from_to");
  }
  get user_id() {
    return this.carForm.get("user_id");
  }
  get vin() {
    return this.carForm.get("vin");
  }
  get vin_image() {
    return this.carForm.get("vin_image");
  }
  getBrands() {
    this.brandSer.getBrands().subscribe(res => {
      this.brands = res.data;
      console.log(this.brands)
    });
  }

  //GET models OF SPECIFIC brand
  onChangeBrand(brandId) {
    console.log(brandId)
    if (brandId) {
      console.log(brandId)
      this.modelsSer.getModel(brandId).subscribe(
        res => {
          this.modelist = res.data;
          console.log(this.modelist);
       
        }
      );
    } else {
      this.modelist = null;
    }
  }
  //get years of specific model
  onChangeModel(modelId) {
    console.log(modelId)
    if (modelId) {
      console.log(modelId)
      //GET ALL YEARS 
      this.modelsSer.getYears(modelId).subscribe(res => {
        this.years = res.data;
        console.log(this.years);
        this.years.from_to.map(element => {
          this.carYears.push(element.from,element.to)
          console.log(this.carYears)
     });

      })
    } else {
      this.carYears = null;
    }
  }
  //Post image one  in 
  onFileSelected(files) {
    this.selectedImge = files.item(0);
    console.log(this.selectedImge)
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;

      console.log(this.imageUrl)
    }
    reader.readAsDataURL(this.selectedImge)
  }
  onSubmit(form) {
    form.value.user_id = 1 ;
    if(this.flag1=='addCar'){
      console.log("addCar")
      form.value.vin_image = this.imageUrl;
      console.log(form.value)
      this.carsSer.addCar(form.value).subscribe(res=>{
        console.log(res);
        this.router.navigate(["/cars"])

      })
    }
    if(this.flag2=='editCar'){
      form.value.vin_image=this.imageUrl
      console.log("editCar",this.id,form.value);
      this.carsSer.editCar(form.value,this.id).subscribe(res=>{
        console.log(res)
        this.router.navigate(["/cars"])
      })

    }
  }
}