import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/dashboard/services/brands.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CitiesResponse } from 'src/app/dashboard/interfaces/cities-response';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  res: CitiesResponse
  addBrandForm: FormGroup;
  flag: string;
  id: any;
  message: string;
  progress: number;
  data: any;
  selectedImge: any;
  imageUrl: any
  brand: any;
  errorMsg: any;
  errorMsg1: any;
  errorMsg2: any;
  flag1: any;
  flag2: any;
  formValue: any;

  constructor(private brandSer: BrandsService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }
  formData = new FormData();
  ngOnInit() {
    this.addBrandForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      logo: new FormControl(null, [Validators.required])
    });
    this.id = this.route.snapshot.params.id;
    console.log(this.id)

    this.flag1 = this.route.snapshot.params.flag1;
    this.flag2 = this.route.snapshot.params.flag2;
    console.log(this.route.snapshot.params, this.flag1, this.flag2);
    // this.brand = { id: 1, name: 'ali', logo: 'sundown.jpg' }
    if (this.flag2 == "editBrand") {
      // this.name.setValue(this.brand.name);
      // this.imageUrl = 'assets/images/sundown.jpg'
      // this.logo.setValue(this.brand.logo)
      this.brandSer.getSpecificBrand(this.id).subscribe(res => {
        this.brand = res.data;
        this.name.setValue(this.brand.name)
        // this.logo.setValue(this.brand.logo)
        console.log(this.brand.logo)
        this.imageUrl = `http://192.168.1.11:3000/storage/brands/${this.brand.logo}`
      })
    }
  }

  get name() {
    return this.addBrandForm.get("name");
  }
  get logo() {
    return this.addBrandForm.get("logo");
  }
  // // UPLOAD IMAGES
  // onFileSelected(files) {
  //   // if (files.length === 0) {
  //   //   return;
  //   // }
  //   let filesToUpload: File[] = files;
  //   Array.from(filesToUpload).map((file, index) => {
  //     console.log(index, file, file.name)
  //     return this.formData.append('file' + index, file, file.name);
  //   });
  //   console.log(filesToUpload)
  // }
  //Post image one  in Node
  onFileSelected(files) {
    this.selectedImge = files.item(0);
    console.log(this.selectedImge)
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;

      console.log(this.imageUrl)
    }
    reader.readAsDataURL(this.selectedImge)
    // console.log(reader.readAsDataURL(this.selectedImge))
    // let headers_object = new HttpHeaders()
    // // headers_object.set('Content-Type', 'application/text');
    // let filesToUpload: File[] = files;
    // let formData = new FormData();
    //     for (var i = 0; i < filesToUpload.length; i++) {
    //         formData.append("uploads[]",filesToUpload[i], filesToUpload[i].name);
    //     }
    //     console.log(filesToUpload)
    //     console.log(formData)
    // this.http.post('http://192.168.1.19:3000/api/brands', formData,{"headers":  headers_object})
    //     .subscribe((response) => {
    //         console.log('response received is ', response);
    //     })
  }
  onSubmit(form) {
    // this.formData.append('name', JSON.stringify(form.controls['name'].value));
    // console.log(this.formData.get('name'))
    // console.log(this.formData)
    // if (!Object.entries) {
    //   Object.entries = function (formData) {
    //     var ownProps = Object.keys(formData),
    //       i = ownProps.length,
    //       resArray = new Array(i); // preallocate the Array
    //     while (i--)
    //       resArray[i] = [ownProps[i], formData[ownProps[i]]];

    //     return resArray;
    //   };
    // }
    // console.log(Object.entries(JSON.stringify(this.formData)))
    // for (var pair of Object.entries(JSON.stringify(this.formData))) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // if (this.imageUrl) {
      //   console.log(this.imageUrl)
      //   form.value.logo = this.imageUrl
      // } else {
        //   console.log(this.imageUrl)
        //   form.value.logo = "";
        //   console.log("logo empty")
        // }
    console.log(this.imageUrl, form.value.logo)
    if (this.flag2 == "editBrand") {
      // Edit BRAND FORM
      console.log("edit brand")
      console.log(this.id)
      if(this.brand.name!=form.value.name){
        this.formValue={'name':form.value.name}
      }
      if(form.value.logo!=null){
        console.log(form.value.logo)
        this.formValue={'logo':this.imageUrl}
      }
    console.log(this.formValue)   
      this.brandSer.editBrand(this.formValue, this.id).subscribe(data => {
        this.router.navigate(["brands"])
      }, (err: HttpErrorResponse) => {
        console.log(err)
        if (err.error.errors.name) {
          console.log("name error")
          this.errorMsg1 = err.error.errors.name[0]
          console.log(err.error.errors.name[0])
        }
      });
    }
    if (this.flag1 == "addBrand") {
      // ADD BRAND FORM
      console.log("add brand")
      form.value.logo = this.imageUrl;
      console.log(form.value)
      this.brandSer.addBrand(form.value).subscribe(data => {
        console.log(data)
        this.router.navigate(["brands"])
      },
        (err: HttpErrorResponse) => {
          console.log(err)
          if (err.error.errors.name) {
            console.log("name error")
            this.errorMsg1 = err.error.errors.name[0]
            console.log(err.error.errors.name[0])
          }
        }

      );
    }

  }
}


