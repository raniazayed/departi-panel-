import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FleetService } from 'src/app/dashboard/services/fleet.service';

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss']
})
export class FleetFormComponent implements OnInit {
  dropdownList: { item_id: number; item_text: string; }[];
  selectedItems: { item_id: number; item_text: string; }[];
  brands: {}[];
  brandIds: any = [];
  urls: any;
  progress: number;
  message: string;
  onUploadFinished: any;
  filterBrandIds: any;
  flag: string;
  id: any;
  selectedImge: File;
  images: any=[]
  imageUrl1: any;
  imageUrl2: any;

  constructor(private http: HttpClient, private fleetSer: FleetService, private route : ActivatedRoute) { }
  fleetForm: FormGroup
  ngOnInit() {
    this.fleetForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, , Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), this.phoneCheck]),
      mobile: new FormControl(null, [Validators.required, this.mobileCheck]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      commercialRegisterPhoto: new FormControl(null, [Validators.required]),
      taxReferncePhoto: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag2;
    console.log(this.route.snapshot.params)
    this.brands = [{ id: 1, brandName: "toyta" }, { id: 2, brandName: "hyndai" }]
  }
  get name() {
    return this.fleetForm.get("name");
  }
  get phone() {
    return this.fleetForm.get("phone");
  }
  get mobile() {
    return this.fleetForm.get("mobile");
  }
  get address() {
    return this.fleetForm.get("address");
  }
  get Email() {
    return this.fleetForm.get("Email");
  }
  // mobileCheck validation
  mobileCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');

    if (pattdig.test(control.value) == true) {
      if (control.value.toString().length !== 9 || control.value.toString().length !== 10) {
        return { 'mobileerror': true } //non-valid
      }
      else {
        return null; //valid
      }
    } else {
      return { 'mobileerror': true } //non-valid

    }
  }
  phoneCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');
    console.log("notnumber")

    if (pattdig.test(control.value) == true) {
      console.log("number")
      if (control.value.toString().length !== 11) {
        return { 'Phoneerror': true } //non-valid
      }
      else {
        return null; //valid
      }
    } else {
      return { 'Phoneerror': true } //non-valid

    }
  }

  // UPLOAD IMAGES
  onFileSelected(file, i) {
    // console.log(file)
    // if (file.length === 0) {
    //   return;
    // }

    // let filesToUpload: File[] = file;
    // console.log(filesToUpload)
    // const formData = new FormData();
    // console.log(formData)

    // Array.from(filesToUpload).map((file, index) => {
    //   console.log(file)
    //   return formData.append('file' + index, file, file.name);
    // });
    this.selectedImge = file.item(0);
    console.log(this.selectedImge)
    // this.images.push(this.selectedImge)
    // console.log(this.selectedImge)
    var reader = new FileReader();
    reader.onload = (event: any) => {
      console.log(i)
      if (i == '1') {
        this.imageUrl1 = event.target.result;
        console.log(this.imageUrl1)
      } else {
        this.imageUrl2 = event.target.result;
        console.log(this.imageUrl2)
      }
    }
    console.log(this.images)
    reader.readAsDataURL(this.selectedImge)
  }

 
  //SUBMIT VENDOR fORM
  onSubmit(form) {
    console.log(form.value);
    form.value.Brands = this.brandIds;
    form.value.commercialRegisterPhoto=this.imageUrl1;
    form.value.taxReferncePhoto=this.imageUrl2
    console.log(form.value)
    if (this.flag == "editFleet") {
      console.log("editFleet")
      // Edit fleet FORM
      // this.fleetSer.editFleet(form.value, this.id).subscribe(data => {
      //   console.log(data)
      // });
    } else {
      console.log("addFleet")
      // ADD fleet FORM
      console.log(form.value)
      // this.fleetSer.addFleet(form.value).subscribe(data => {
      //   console.log(data)
      // });
    }
  }
}
