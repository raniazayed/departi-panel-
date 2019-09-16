import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AreasService } from 'src/app/dashboard/services/areas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CitiesService } from 'src/app/dashboard/services/cities.service';
@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {

  
  areasForm: FormGroup;
  flag: any;
  id: any;
  cities: any;
  redirectUrl: string;
  flag2: string;
  area: any;
  cityName: any[];

  constructor(private areasSer :AreasService,private route : ActivatedRoute,private router:Router,private citySer:CitiesService) { }

  ngOnInit() {
    this.areasForm = new FormGroup({
      name : new FormControl(null, [Validators.required]),
      city_id : new FormControl(null, [Validators.required])

    });
    
    this.citySer.getCities().subscribe(res=>{
      this.cities = res.data;
      console.log(this.cities)
    })

    this.id = this.route.snapshot.params.id
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag1;
    this.flag2=this.route.snapshot.params.flag2;
    console.log(this.route.snapshot.params);
    // this.cities=[{id:1,name:'alex'},{id:2,name:'cairo'}]
    if(this.flag2== "editArea"){
      this.areasSer.getArea(this.id).subscribe(res=>{
        this.area = res.data
        console.log(this.area)
        this.name.setValue(this.area.name)
        this.city_id.setValue(this.area.city_id)
        this.citySer.getSpecificCity(this.area.city_id).subscribe(res=>{
          this.cityName=res.data;
          console.log(this.cityName)
        })
      })
    }
    this.redirectUrl = this.router.url;
    console.log(this.redirectUrl,this.route.snapshot.params)
    if(this.redirectUrl.includes("/city")){
      this.flag=true;
      console.log(this.flag);
      this.city_id.setValue(this.id)
    }else{
      // this.brand_id.setValue(this.id)
      // console.log(this.brand_id)
    }
   
  }
  
  get name() {
    return this.areasForm.get("name");
  }
  get city_id() {
    return this.areasForm.get("city_id");
  }
 
  // ADD area FORM
  onSubmit(form){
    console.log(form.value)
    if(this.flag2=='editArea'){
      this.areasSer.editArea(form.value, this.id).subscribe(data => {
        console.log(data)
        if(this.flag==true){
          console.log(this.flag)
          this.router.navigate(['/cities']);
        }else{
          this.router.navigate(["/areas"]);
        }
      })
    }else{

      this.areasSer.addArea(form.value).subscribe(data=>{
        console.log(data)
        if(this.flag==true){
          console.log(this.flag)
          this.router.navigate(['/cities']);
        }else{
          this.router.navigate(["/areas"]);
        }
      });
    }
  //   if (this.flag == "editArea") {
  //     // this.areasSer.editArea(form,this.id).subscribe(data=>{
  //     //   console.log(data)
  //     // });
  //   }else{
  //   console.log(form.value)
  //   this.areasSer.addArea(form).subscribe(data=>{
  //     console.log(data)
  //   });
  //   }
  }

}
