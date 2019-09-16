import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { VendorService } from '../../services/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/dashboard/interfaces/response'

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
  dropdownList: { item_id: number; item_text: string; }[];
  selectedItems: { item_id: number; item_text: string; }[];
  brands: any;
  brandIds: any = [];
  urls: any;
  progress: number;
  message: string;
  onUploadFinished: any;
  filterBrandIds: any;
  flag: string;
  id: any;
  selectedImge: any;
  imageUrl1: any;
  imageUrl2: any;
  res:Response
  constructor(private http: HttpClient, private vendorSer: VendorService, private route : ActivatedRoute) { }
  vendorForm: FormGroup
  ngOnInit() {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, , Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(9), this.phoneCheck]),
      mobile: new FormControl(null, [Validators.required, this.mobileCheck]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Brands: new FormControl(null, [Validators.required]),
      spareParts: new FormControl(null, [Validators.required]),
      partstype: new FormControl(null, [Validators.required]),
      commercialRegisterPhoto: new FormControl(null, [Validators.required]),
      taxReferncePhoto: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params)
    // this.brands = [{ id: 1, brandName: "toyta" }, { id: 2, brandName: "hyndai" },{ id: 3, brandName: "kia" }];
    this.vendorSer.getBrands().subscribe(res=>{
    this.brands = res.data;
    this.name.setValue(this.brands.name)
    this.Email.setValue(this.brands.Email)
    this.phone.setValue(this.brands.phone)
    this.mobile.setValue(this.brands.mobile)
    this.address.setValue(this.brands.address)
    this.Brands.setValue(this.brands.Brands)
    this.partstype.setValue(this.brands.partstype)
    this.imageUrl1 = this.brands.commercialRegisterPhoto;
    this.imageUrl2 = this.brands.commercialRegisterPhoto
    console.log(this.brands)
    })
  }
  get name() {
    return this.vendorForm.get("name");
  }
  get phone() {
    return this.vendorForm.get("phone");
  }
  get mobile() {
    return this.vendorForm.get("mobile");
  }
  get address() {
    return this.vendorForm.get("address");
  }
  get Brands() {
    return this.vendorForm.get("Brands");
  }
  get spareParts() {
    return this.vendorForm.get("spareParts");
  }
  get partstype() {
    return this.vendorForm.get("partstype");
  }
  get Email() {
    return this.vendorForm.get("Email");
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
  onFileSelected(file,i) {
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
    reader.readAsDataURL(this.selectedImge)
   
  }
 

  // BRANDS
  FieldsChange(id, event) {
    console.log(id, event)
    console.log(event.target.checked)
    this.brandIds.push(id)
    // if(this.brandIds.includes(id))
    // if(event.target.checked){
    //   console.log("true")
    //   console.log(this.brandIds)
    //   this.filterBrandIds = this.brandIds.filter(elem=>{
    //     if (elem==id){
    //       console.log("not exist")
    //     return  this.brandIds
    //     }
    //   })
    //   console.log(this.brandIds)
    //   console.log(this.filterBrandIds)
    // }
  }
  //SUBMIT VENDOR fORM
  onSubmit(form) {
    console.log(form.value);
    // form.value.Brands = this.brandIds
    form.value.commercialRegisterPhoto=this.imageUrl1;
    form.value.taxReferncePhoto=this.imageUrl2
    console.log(form.value)
    if (this.flag == "editVendor") {
      console.log("editVendor")
      // Edit VENDOR FORM
      // this.vendorSer.editVendor(form.value, this.id).subscribe(data => {
      //   console.log(data)
      // });
    } else {
      console.log("addVendor")
      // ADD VENDOR FORM
      console.log(form.value)
      // this.vendorSer.addVendor(form.value).subscribe(data => {
      //   console.log(data)
      // });
    }
  }
}

