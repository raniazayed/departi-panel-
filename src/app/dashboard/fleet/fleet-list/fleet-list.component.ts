import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/dashboard/services/fleet.service';
import { Response } from 'src/app/dashboard/interfaces/response'

@Component({
  selector: 'app-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {
  flag1: string;
  flag2: string;
  fleetList: Response

  constructor(private fleetListSer:FleetService) { }

  ngOnInit() {
    this.flag1 = "addFleet";
    this.flag2 = "editFleet";
    // this.fleetList = [{ id: 1, name: "toyota", address: "alex" }, { id: 2, name: "hyndai", address: "alex" }];
    // GET FLEET LIST
   this.getFleet()
  }
  getFleet(){
     // this.fleetListSer.getFleetList().subscribe(res=>{
    //   this.fleetList = res.data ;
    //   console.log(this.fleetList)
    // })
  }
    // DELETE Brand
    deleteFleetList(id) {
      this.fleetListSer.deleteFleetList(id).subscribe(data => {
        console.log(data);
        this.getFleet()
      })
    }
  }


