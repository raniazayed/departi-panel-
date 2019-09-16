import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../services/units.service';
import { UnitsResponse } from '../interfaces/units-response';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  flag1: string;
  flag2: string;
  res: UnitsResponse
  id: any;
  units: any;
  constructor(private unitsSer: UnitsService) { }

  ngOnInit() {
    this.flag1 = "addUnit";
    this.flag2 = "editUnit";
    this.id = 1
    //get USER'S CARS
    this.getUnits();
    this.units=[{id:1,name:'unit1'}];
    console.log(this.units)
  }


  //get UNITS
  getUnits() {
    this.unitsSer.getUnits().subscribe(res => {
      this.units = res.data;
      console.log(this.units)
    })
  }

}


