import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/dashboard/services/vendor.service';

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {
  vendorsList: any;
  flag1: string;
  flag2: string;

  constructor(private vendorListsSer: VendorService, public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    this.flag1 = "addVendor";
    this.flag2 = "editVendor";
    this.vendorsList = [{ id: 1, name: "toyota", address: "alex" }, { id: 2, name: "hyndai", address: "alex" }];
    // GET VENDORS LIST
    // this.vendorListsSer.getVendorList().subscribe(data=>{
    //   this.vendorsList = data ;
    //   console.log(data)
    // })
  }
  // DELETE Vendor
  deleteVendorList(id) {
    this.vendorListsSer.deleteVendorList(id).subscribe(data => {
      console.log(data)
    })
  }
}
