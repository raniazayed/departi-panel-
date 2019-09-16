import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/dashboard/services/cars.service';
import { CarsResponse } from 'src/app/dashboard/interfaces/cars-response';
import { DeleteConfirmationComponent } from 'src/app/dashboard/modals/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  flag1: string;
  flag2: string;
  cars: any
  res:CarsResponse
  id: any;
  constructor(private carsSer:CarsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.flag1 = "addCar" ; 
    this.flag2 = "editCar";
    // this.id=1
    //get USER'S CARS
    this.getCars();
    // this.cars=[{id:1,user_id:1,brand_id:1,model_id:1,year:1998,vin:5,vin_image:"assets/images/elrizk.png",brand_name:"toyta",model_name:"corrola"}]
  }
 

  //get cars
  getCars(){
    this.carsSer.getCars().subscribe(res=>{
      this.cars = res.data;
      console.log(this.cars)
    })
  }
  // DELETE CAR
  deleteCar(id){
    console.log(id)
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '500px',
      data: {id: id, delete:"car" }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.getCars()
        console.log('The dialog was closed');
    }); 
  }

}
