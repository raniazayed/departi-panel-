import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/dashboard/interfaces/response'
import { HttpErrorResponse } from '@angular/common/http';
import { City } from 'src/app/dashboard/interfaces/city';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {

  citiesForm: FormGroup;
  id: any;
  flag: any;
  cities: any;
  res: Response
  errorMsg: any;
  errorMsg1: any;
  errorMsg2: any;
  city:City
  constructor(private citySer: CitiesService, private route: ActivatedRoute, private router: Router, private title:Title) {
    // this.title.setTitle('Admin panel - add city')

   }

  ngOnInit() {
    this.citiesForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      code: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params.flag1);
    if(this.flag == "editCity"){
      this.citySer.getSpecificCity(this.id).subscribe(res => {
        this.cities = res.data;
        this.name.setValue(this.cities.name)
        this.code.setValue(this.cities.code)
      });
    }
    // this.city  = {id:1,name:"alex",code:"3"}
    // if(this.flag == "editCity"){
    //   this.name.setValue(this.city.name);
    //   this.code.setValue(this.city.code)
    // }

  }

  get name() {
    return this.citiesForm.get("name");
  }
  get code() {
    return this.citiesForm.get("code");
  }

  // ADD BRAND FORM
  onSubmit(form) {
    console.log(form)
    console.log(this.flag)
    form.value.code = "0" + form.value.code
    console.log(form.value)
    if (this.flag == "editCity") {
      // Edit BRAND FORM
      form.value.id = this.id;
      console.log(form.value)
      this.citySer.editCity(form.value, this.id).subscribe(data => {
        console.log(data)
        this.router.navigate(["cities"])
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          if (err.error.errors.name) {
            this.errorMsg = err.error.errors.name[0]
            console.log(err.error.errors.name[0])
          } else {
            this.errorMsg = err.error.errors.code[0]
          }
        })
    }
    if(this.flag=="addCity"){
      console.log(form.value)
      this.citySer.addCity(form.value).subscribe(data => {
        console.log(data);
        this.router.navigate(["cities"])
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        if (err.error.errors.name) {
          console.log("name error")
          this.errorMsg1 = err.error.errors.name[0]
          console.log(err.error.errors.name[0])
        } else if(err.error.errors.code){
          console.log("code error")
          this.errorMsg2 = err.error.errors.code[0];
          console.log(err.error.errors.code[0])
        }else{
          console.log("code and name error")
          this.errorMsg1 = err.error.errors.name[0];
          this.errorMsg2 = err.error.errors.code[0];
          console.log(this.errorMsg1,this.errorMsg2)
        }
      })
    } 
  }}



