import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VendorService } from '../../dashboard/services/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/dashboard/interfaces/response'
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { BrandResponse } from 'src/app/dashboard/interfaces/brand-response';
import { Fleet } from '../models/fleet';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

 
  brands: any;
  brandIds: any = [];
  flag: string;
  id: any;
  selectedImge: any;
  imageUrl1: any;
  imageUrl2: any;
  userForm: any
  fleetForm: any
  registrationErrorMessage: any;
  vendor: any;
  res: Response
  redirectUrl: string;
  fleet: any;
  user: any;
  roleName: string;
  constructor( private vendorSer: VendorService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }
  signupForm: FormGroup
  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.validateName]),
      email: new FormControl(null, [Validators.required, this.validateEmail]),
      mobile: new FormControl(null, [Validators.required, this.mobileCheck]),
      phone: new FormControl(null, [Validators.required,this.phoneCheck]),
      password: new FormControl(null, [Validators.required]),
      c_password: new FormControl(null, [Validators.required]),
      city_id: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Brands: new FormControl(null, [Validators.required]),
      partstype: new FormControl(null, [Validators.required]),
      commercialRegisterPhoto: new FormControl(null, [Validators.required]),
      taxReferncePhoto: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)
    this.flag = this.route.snapshot.params.flag1;
    console.log(this.route.snapshot.params)
    if (this.flag == 'vendor') {
      this.brands = [{ id: 1, brandName: "toyta" }, { id: 2, brandName: "hyndai" }, { id: 3, brandName: "kia" }];
      console.log("sign up vendor ");
      this.vendorSer.getBrands().subscribe(res => {
        this.brands = res.data;
        console.log(this.brands)
      });
    }
    this.redirectUrl = this.router.url;
    console.log(this.redirectUrl, this.route.snapshot.params)
    //EDIT VENDOR PROFILE
    if (this.flag == 'editProfile' && this.redirectUrl.includes("vendor")) {
      if(this.authService.getRole()=='vendor'){
        this.vendorSer.getBrands().subscribe(res => {
          this.brands = res.data;
          console.log(this.brands)
        });
          this.roleName = this.authService.getRole() ;
          console.log("edit vendor profile", this.id);
          this.authService.getVendorData(this.id).subscribe(res => {
            this.vendor = res.data;
            console.log(this.vendor);
            this.name.setValue(this.vendor.name)
            this.password.setValue(this.vendor.password)
            this.c_password.setValue(this.vendor.c_password)
            this.email.setValue(this.vendor.email)
            this.phone.setValue(this.vendor.phone)
            this.mobile.setValue(this.vendor.mobile)
            this.city_id.setValue(this.vendor.city_id)
            this.Brands.setValue(this.vendor.Brands)
            this.partstype.setValue(this.vendor.partstype)
            this.imageUrl1 = this.vendor.commercialRegisterPhoto;
            this.imageUrl2 = this.vendor.taxReferncePhoto
          })
        }else{
          this.router.navigate(["/forbidden"])
        }
      
    }

    //EDIT FLEET PROFILE
    if (this.flag == 'editProfile' && this.redirectUrl.includes("fleet")) {
      if(this.authService.getRole()=='fleet'){
        this.roleName = this.authService.getRole() ;
        console.log(this.roleName)
        console.log("edit fleet profile", this.id);
        this.authService.getFleetData(this.id).subscribe(res => {
          this.fleet = res.data;
          console.log(this.fleet);
          this.name.setValue(this.fleet.name)
          this.email.setValue(this.fleet.email)
          this.password.setValue(this.fleet.password)
          this.c_password.setValue(this.fleet.c_password)
          this.phone.setValue(this.fleet.phone)
          this.mobile.setValue(this.fleet.mobile)
          this.city_id.setValue(this.fleet.city_id)
          this.imageUrl1 = this.fleet.commercialRegisterPhoto;
          this.imageUrl2 = this.fleet.taxReferncePhoto
        })
      }else{
        this.router.navigate(["/forbidden"])
      }
    }
    //EDIT FLEET PROFILE
    if (this.flag == 'editProfile' && this.redirectUrl.includes("user")) {
      if(this.authService.getRole()=='user'){
        this.roleName = this.authService.getRole() ;
        console.log(this.roleName)
        console.log("edit user profile", this.id);
        this.user = {id:1,name:"kk",email:"r@gmail.com",phone:"010",mobile:"021",city_id:2,password:"123456",c_password:"123456"}
        this.name.setValue(this.user.name)
        this.email.setValue(this.user.email)
        this.phone.setValue(this.user.phone)
        this.mobile.setValue(this.user.mobile)
        this.city_id.setValue(this.user.city_id)
        this.password.setValue(this.user.password)
        this.c_password.setValue(this.user.c_password)
        this.authService.getUserData(this.id).subscribe(res => {
          this.user = res.data;
          console.log(this.user);
       
        })
      }else{
        this.router.navigate(["/forbidden"])
      }
    }

  }
  get name() {
    return this.signupForm.get("name");
  }
  get phone() {
    return this.signupForm.get("phone");
  }
  get mobile() {
    return this.signupForm.get("mobile");
  }
  get city_id() {
    return this.signupForm.get("city_id");
  }
  get Brands() {
    return this.signupForm.get("Brands");
  }
  get partstype() {
    return this.signupForm.get("partstype");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get password() {
    return this.signupForm.get("password");
  }
  get c_password() {
    return this.signupForm.get("c_password");
  }
  // custom validator to check that two fields match
  MustMatch(fGroup: FormGroup): { [s: string]: boolean } {
    if (fGroup.get('password').value) {

      if (fGroup.get('c_password').value) {
        console.log("val")
        return fGroup.get('password').value === fGroup.get('c_password').value
          ? null : { 'mismatch': true };
      }
    }
  }
  //VALIDATE NAME
  validateName(control: FormControl): { [s: string]: boolean } {
    const patt = /^[a-zA-Z]+$/;
    console.log(patt.test(control.value))
    if (patt.test(control.value) == true) {
      console.log("no nums")
      return null; //valid
    }
    else {
      return { 'nameerror': true } //not valid
    }
  }
  //VALIDATE EMAIL
  validateEmail(control: FormControl): { [s: string]: boolean } {
    
    var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(control.value)) {
      console.log(control.value)
      return null; // vaild
    }
    return { 'validationError': true } //invalid
  }

  // mobileCheck validation
  mobileCheck(control: FormControl): { [s: string]: boolean } {
    const pattdig = new RegExp('^[0-9]+$');
    // console.log("notnumber")
    if (pattdig.test(control.value) == true) {
      console.log("number", control.value.toString().length)
      if (control.value.toString().length !== 10) {
        return { 'mobileerror': true } //non-valid
      }
      else {
        console.log("11 nums")
        return null; //valid
      }
    } else {
      return { 'mobileerror': true } //non-valid

    }
  }
  phoneCheck(control: FormControl): { [s: string]: boolean } {
    // debugger;
    const pattdig = new RegExp('^[0-9]+$');
    if (pattdig.test(control.value) == true) {
      console.log("number", control.value.toString().length)
      if (control.value.toString().length !== 8 && control.value.toString().length !== 9) {
        console.log(" not 9 or 10")
        return { 'phoneerror': true } //non-valid
      }
      else {
        console.log("9 or 10")
        return null; //valid
      }
    } else {
      return { 'phoneerror': true } //non-valid

    }
  }

  // UPLOAD IMAGES
  onFileSelected(file, i) {
    this.selectedImge = file.item(0);
    console.log(this.selectedImge)
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
  }
  //SUBMIT VENDOR fORM
  onSubmit(form) {
    console.log(form, this.imageUrl1);
    //User form
    this.userForm = {
      'password': form.value.password,
      'email': form.value.email,
      'c_password': form.value.c_password,
      'city_id': form.value.city_id,
      'mobile': form.value.mobile,
      'name': form.value.name,
      'phone': form.value.phone
    }
    //FLEET FORM
    this.fleetForm = {
      'password': form.value.password,
      'email': form.value.email,
      'c_password': form.value.c_password,
      'city_id': form.value.city_id,
      'mobile': form.value.mobile,
      'name': form.value.name,
      'phone': form.value.phone,
      'commercialRegisterPhoto': this.imageUrl1,
      'taxReferncePhoto': this.imageUrl2
    }
    if (this.flag == 'editProfile' && this.redirectUrl.includes("user")) {
      if(this.authService.getRole()=='user'){
        console.log(this.userForm, 'edit user');
        this.authService.editUserData(this.id,this.userForm).subscribe(res=>{
          console.log(res.data)
        })
      }}
    if (this.flag == 'user') {
      console.log(this.userForm, 'add user');
      this.authService.userSignUp(this.userForm)
        .subscribe(
          (user: any) => {
            console.log(user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.authService.saveUserDataToLocalStorage(user);
            this.router.navigate(['/home'])
          },
          error => {
            this.registrationErrorMessage = error.error.message;
          }
        );
    }
    if (this.flag == 'editProfile' && this.redirectUrl.includes("fleet")) {
      if(this.authService.getRole()=='fleet'){
        console.log(this.fleetForm, 'edit Fleet');
        this.authService.editFleetData(this.id,this.fleetForm).subscribe(res=>{
          console.log(res.data)
        })
      }}
    if (this.flag == 'fleet') {
      console.log(this.fleetForm, 'add fleet');
      this.authService.fleetSignUp(this.fleetForm)
        .subscribe(
          (fleet: any) => {
            console.log(fleet)
            // store fleet details and jwt token in local storage to keep fleet logged in between page refreshes
            this.authService.saveUserDataToLocalStorage(fleet);
            this.router.navigate(['/home']);

          },
          error => {
            this.registrationErrorMessage = error.error.message;
          }
        );

    }
    if (this.flag == 'editProfile' && this.redirectUrl.includes("vendor")) {
      if(this.authService.getRole()=='vendor'){
        console.log(form.value, 'edit vendor');
        this.authService.editVendorData(this.id,form.value).subscribe(res=>{
          console.log(res.data)
        })
      }}
    if (this.flag == 'vendor') {
      console.log(form.value, 'vendorForm')
      form.value.commercialRegisterPhoto = this.imageUrl1;
      form.value.taxReferncePhoto = this.imageUrl2
      this.authService.vendorSignUp(form.value)
        .subscribe(
          (vendor: any) => {
            console.log(vendor)
            // store vendor details and jwt token in local storage to keep vendor logged in between page refreshes
            this.authService.saveUserDataToLocalStorage(vendor);
            this.router.navigate(['/home']);
          },
          error => {
            this.registrationErrorMessage = error.error.message;
          }
        );
    }



  }

}
