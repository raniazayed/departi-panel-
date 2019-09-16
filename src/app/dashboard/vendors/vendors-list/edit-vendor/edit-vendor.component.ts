import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  progress: number;
  message: string;
  brands: { id: number; brandName: string; }[];
  brandIds: any;

  constructor(private http :HttpClient) { }
  editVendorForm:FormGroup
  ngOnInit() {
    this.editVendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required,, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      mobile: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      Brands: new FormControl(null, [Validators.required]),
      spareParts: new FormControl(null, [Validators.required]),
      partstype  : new FormControl(null, [Validators.required]),
      commercialRegisterPhoto  : new FormControl(null, [Validators.required]),
      taxReferncePhoto  : new FormControl(null, [Validators.required])
    });
    this.brands = [{id:1,brandName:"toyta"},{id:2,brandName:"hyndai"}]
  }
  get name() {
    return this.editVendorForm.get("name");
  }
  get phone() {
    return this.editVendorForm.get("phone");
  }
  get mobile() {
    return this.editVendorForm.get("mobile");
  }
  get address() {
    return this.editVendorForm.get("address");
  }
  get Brands() {
    return this.editVendorForm.get("Brands");
  }
  get spareParts() {
    return this.editVendorForm.get("spareParts");
  }
  get partstype() {
    return this.editVendorForm.get("partstype");
  }
  get Email() {
    return this.editVendorForm.get("Email");
  }
  onFileSelected(files){
    console.log(files)
    if (files.length === 0) {
      return;
    }
   
    let filesToUpload : File[] = files;
    console.log(filesToUpload)
    const formData = new FormData();
    console.log(formData)
      
    Array.from(filesToUpload).map((file, index) => {
      console.log(file)
      return formData.append('file'+index, file, file.name);
    });
   
    this.http.post('https://localhost:4200/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
        }
      });
  }
  
  // BRANDS
  FieldsChange(id,event){
    console.log(id,event)
    console.log(event.target.checked)
    this.brandIds.push(id)
  }
   //SUBMIT VENDOR fORM
   onSubmit(form){
    console.log(form.value);
    form.value.Brands=this.brandIds
    console.log(form.controls.name.invalid);
    console.log(form.controls.name.touched);
    // SUBMIT FORM
    // this.vendorSer.submitVendorForm(form).subscribe(data=>{
    //   console.log(data)
    // })
    }
}
