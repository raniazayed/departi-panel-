import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AreasService } from 'src/app/dashboard/services/areas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from 'src/app/dashboard/interfaces/response'
import { CitiesService } from '../services/cities.service';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  areas: any;
  flag1: string;
  flag2: string;
  flagBtn: boolean = true;

  // areaNamee:any
   fieldArray: Array<any> = [];
   newAttribute: any = { id: 3, areaNamee: "" };
  areasForm: FormGroup;
  editable: boolean;
  newArray: any[];
  addArea = false;
  editId: any;
  lastElem: number;
  res: Response
  id: any;
  cities: any[];
  redirectUrl: any;
  flag: boolean;
  areaName: any;
  constructor(private route: Router, private router: ActivatedRoute, private areasSer: AreasService, private citySer: CitiesService,  public dialog: MatDialog) { }
  ngOnInit() {
    this.flag1 = "addArea";
    this.flag2 = "editArea";
    this.editable = false;
    //GET AREAS
    this.id = this.router.snapshot.params.id;
    console.log(this.id);
    this.redirectUrl = this.route.url;
    console.log(this.redirectUrl, this.router.snapshot.params)
    if (this.redirectUrl.includes("/city")) {
      // this.fieldArray = [{ id: 1, name: "smouha" }, { id: 2, name: "loaran" }];
      this.getAreas();
      console.log("get city areas")
      this.flag = true;
      console.log(this.flag);

    } else {
      console.log("get all areas")
      // this.fieldArray = [{ id: 1, name: "smouha" }, { id: 2, name: "loaran" }, { id: 3, name: "hhh" }];
      this.getAllAreas();

    }
    this.areasForm = new FormGroup({
      name: new FormControl({ value: "", disabled: true }, [Validators.required]),
      city_id: new FormControl({ value: "", disabled: true }, [Validators.required])
    });
    // this.cities = [{ id: 1, name: "cairo" }, { id: 2, name: "alex" }]
    this.getCities()

  }
  //GET CITIES
  getCities(){
    this.citySer.getCities().subscribe(res=>{
      this.cities = res.data;
      console.log(this.cities)
    })
  }
  //Get cities AREAS
  getAreas() {
    console.log(this.id)
    this.areasSer.getAreas(this.id).subscribe(res => {
      this.fieldArray = res.data;
      console.log(this.fieldArray)
    })
  }
  //GET ALL AREAS
  getAllAreas() {
    this.areasSer.getAllAreas().subscribe(res=>{
      this.fieldArray=res.data
      console.log(this.fieldArray)
    })
  }
  get city_id() {
    return this.areasForm.get("city_id");
  }

  get name() {
    return this.areasForm.get("name");
  }

  // DELETE deleteAreaslList
  deleteAreaslList(id) {
    console.log(id)

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      data: {id: id, delete:"area" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.flag == true) {
        this.getAreas();
      } else {
        this.getAllAreas();
      }      console.log('The dialog was closed');
    }); 
       
  }
  //ADD AREA
  addAreaValue() {
    // this.lastElem = this.fieldArray[this.fieldArray.length-1] ;
    // console.log(this.newAttribute)
    // this.fieldArray.push(this.newAttribute)
    // this.newAttribute = {id:3,areaNamee:""}
    // this.editable = true;
    // this.flagBtn = true;
    // console.log(this.lastElem)
  }

  editAreaslList(id, area) {
    console.log(document.getElementsByClassName(id))
    console.log(id, area)
    this.editable = true;
    this.flagBtn = false;
    // (document.getElementById(id).children[0] as any).disabled = false;
    for (var i = 0; i < document.getElementsByClassName(id).length; i++) {
      (document.getElementsByClassName(id)[i] as any).disabled = false;
    }
    this.editId = id;
    this.areaName = area
  }

  // @ViewChild("f", { static: false }) areaForm: NgForm;
  onSubmit(form) {
    for (var i = 0; i < document.getElementsByClassName(this.editId).length; i++) {
      (document.getElementsByClassName(this.editId)[i] as any).disabled = true;
    } console.log(form.value)
    if (this.flag == true) {
      if (form.value.city_id == "") {
        form.value.city_id = this.id;
        console.log(form.value)
      }
    } else {
      if (form.value.city_id == "") {
        form.value.city_id = this.editId;
        console.log(form.value)
      }
    }
    if (form.value.name == "") {
      form.value.name = this.areaName;
    }
    this.editable = false;
    console.log(form.value, this.editId)
    console.log(this.fieldArray)
    this.areasSer.editArea(form.value, this.editId).subscribe(data => {
      console.log(data)
    })
    // if (this.flagBtn == true) {
    //   console.log("addarea")
    //   this.areasSer.addArea(form.value, this.id).subscribe(data => {
    //     console.log(data)
    //   });
    // } else {
    //   console.log(form.value.area, this.editId, this.id)
    //   console.log("editarea")
    //   this.areasSer.editArea(form.value.area, this.editId, this.id).subscribe(data => {
    //     console.log(data)
    //   })
    // }
    // // this.fieldArray.push(this.newAttribute)
    // // this.newAttribute = {}
    // // this.newAttribute.areaNamee = form.newAttribute;
    // console.log(form)
    // // console.log(this.editable)
    // console.log(this.fieldArray)
    // if (form.valid) {
    //   console.log(form.value);
    //   // this.areasSer.addArea(form).subscribe(data=>{
    //   //   console.log(data)
    //   // });
    // }
  }
  //DELETE AREA
  // deleteFieldValue(index) {
  //     this.fieldArray.splice(index, 1);
  // }
}
