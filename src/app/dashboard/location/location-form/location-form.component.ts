import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/dashboard/services/location.service';
import { LocationForm } from 'src/app/dashboard/interfaces/location-form';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  router: any;
  locationForm: FormGroup;
  flag: string;
  lat: number = 51.678418;
  lng: number = 7.809007;
  latitude: any;
  langitude: any;
  chosenLocation: boolean = false;
  cities: { id: number; name: string; }[];
  areas: { id: number; name: string; }[];
  formValue: LocationForm;
  constructor(private route : ActivatedRoute, private locationSer: LocationService) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;
    console.log(id);
    this.locationForm = new FormGroup({
      cityName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      Address: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      cityArea: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lang: new FormControl(null),
      latt: new FormControl(null)
    });
    //GET CITIES
    this.cities = [{id:1,name:"alex"}, {id:2, name:"cairo"}];
    this.areas = [{id:1,name:"louran"}, {id:2, name:"smouha"}];

    //  this.locationSer.getCities().subscribe(data=>{
    //   this.cities = data;
    // })
    //GET AREAS DROP DOWN
    //  this.locationSer.getAreas().subscribe(data=>{
    //   this.areas = data;
    // })
  }
  get cityName() {
    return this.locationForm.get("cityName");
  }
  get Address() {
    return this.locationForm.get("Address");
  }
  get cityArea() {
    return this.locationForm.get("cityArea");
  }
  onChooseLocation(map){
    console.log(map)
    console.log(map.coords)
    this.latitude = map.coords.lat;
    this.langitude = map.coords.lng;
    this.chosenLocation = true
  }
  //GET AREAS OF SPECIFIC CITY
  onChangeCity(cityId){
    console.log(cityId)
    // if (cityId) {
    //   console.log(cityId)
    //   this.locationSer.getAreas(cityId).subscribe(
    //     data => {
    //       this.areas = data;
    //       console.log(this.areas)
    //     }
    //   );
    // } else {
    //   this.areas = null;
    // }
  }
 //SUBMIT Location fORM
 onSubmit(form) {
  console.log(form.value);
  console.log(form)
  form.value.latt = this.latitude
  form.value.lang = this.langitude
  if (this.flag == "editLocation") {
    console.log("editLocation")
    
    this.locationSer.getLocationData().subscribe(data => {
      this.formValue = data;
      console.log(this.formValue)
      this.cityName.setValue(this.formValue.cityName) 
      this.Address.setValue(this.formValue.Address) 
      this.cityArea.setValue(this.formValue.cityArea) 
    });
    // Edit editVendor FORM
    // this.locationSer.editLocation(form, this.id).subscribe(data => {
    //   console.log(data)
    // });
  } else {
    console.log("addLocation")
    // ADD addLocation FORM
    console.log(form.value)
    // this.locationSer.addLocation(form).subscribe(data => {
    //   console.log(data)
    // });
  }
}
}
