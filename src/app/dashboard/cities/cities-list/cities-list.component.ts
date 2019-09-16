import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/dashboard/services/cities.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Response } from 'src/app/dashboard/interfaces/response'
import { Title } from '@angular/platform-browser';
import { DeleteConfirmationComponent } from 'src/app/dashboard/modals/delete-confirmation/delete-confirmation.component';
@Component({
  selector: 'app-cities-list',
  templateUrl: './cities-list.component.html',
  styleUrls: ['./cities-list.component.scss']
})
export class CitiesListComponent implements OnInit {
  flag1: string;
  flag2: string;
  
  private newAttribute: any = {};
  res: Response;
  cities: any;
  constructor(private citiesSer:CitiesService,public dialog: MatDialog,private route:Router, private title:Title) {
    this.title.setTitle('Admin panel - cities')
   }

  ngOnInit() {
    this.flag1 = "addCity" ; 
    this.flag2 = "editCity";
    // this.cities  = [{id:1,name:"alex",code:"03"},{id:2,name:"alex",code:"03"}]
    this.getCities()
  }
 getCities(){
  this.citiesSer.getCities().subscribe(res=>{
    this.cities = res.data ; 
    console.log(res)
  })
 }

// DELETE ModelList
deletecitieslList(id){
  const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
    width: '500px',
    data: {id: id, delete:"city" }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getCities()
    console.log('The dialog was closed');
  }); 
}
//ADD city
addCityValue() {
  // this.cities.push(this.newAttribute)
  // this.newAttribute = {};
  // console.log(this.cities)
  // this.route.navigate("")
  }


// onSubmit(form: NgForm){
//   console.log(form.controls)
//   if (form.valid) {
//     console.log(form.value);
//   // this.citiesSer.addCity(form).subscribe(data=>{
//   //   console.log(data)
//   // });
// }
// }
}
