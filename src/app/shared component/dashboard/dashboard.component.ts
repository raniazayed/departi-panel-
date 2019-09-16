// import { LogoutComponent } from './../../modals/logout/logout.component';
// import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  logout(){
    // const dialogRef = this.dialog.open(LogoutComponent, {
    //   width: '600px',
    // });
    // this.authSer.logout();
    // this.router.navigate(['']);
  }

}
