import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnitsService } from 'src/app/dashboard/services/units.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {

  unitsForm: FormGroup;
  flag: any;
  id: any;
  redirectUrl: string;
  flag2: string;
  unit: any;
  constructor(private unitsSer :UnitsService,private route : ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.unitsForm = new FormGroup({
      name : new FormControl(null, [Validators.required]),

    });
    this.flag = this.route.snapshot.params.flag1;
    this.flag2=this.route.snapshot.params.flag2;
    console.log(this.route.snapshot.params);
    this.id = this.route.snapshot.params.id
    console.log(this.id);
    if(this.flag2== "editArea"){
      this.unitsSer.getSpecificUnit(this.id).subscribe(res=>{
        this.unit = res.data
        console.log(this.unit)
        this.name.setValue(this.unit.name)
      })
    }
  }
  
  get name() {
    return this.unitsForm.get("name");
  }
 
 
  // ADD area FORM
  onSubmit(form){
    if(this.flag2=='editUnit'){
      console.log(form.value)
      console.log(this.id)
      this.unitsSer.editUnit(form.value, this.id).subscribe(data => {
        console.log(data)
        this.router.navigate(['/units']);
      })
    }else if(this.flag=='addUnit'){
      console.log(form.value)
      this.unitsSer.addUnit(form.value).subscribe(data=>{
        console.log(data)
        this.router.navigate(['/units']);
      });
    }
  }
}
