import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/dashboard/services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  location: { id: number; cityName: string; Address: string; cityArea: string; };
  flag1: string;
  flag2: string;


  constructor(private locationSer:LocationService, private router:ActivatedRoute) { }
  locations:any;
  ngOnInit() {
    this.flag1 = "addLocation" ; 
    this.flag2 = "editLocation";
    this.location = {id:1,cityName:"alex",Address:"bl777",cityArea:"smouha"} ;
   
    //GET USERS'S LOCATIONS
    // this.locationSer.getLocations().subscribe(data=>{
    //   this.cities = data ; 
    // })
 
  }

// DELETE deleteLocation
deleteLocation(id){
  this.locationSer.deleteLocation(id).subscribe(data=>{
    console.log(data)
  })
}
}
