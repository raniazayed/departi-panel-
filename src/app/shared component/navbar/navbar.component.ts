import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  logout() {

    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '600px',
    });
    // this.loginstatus = this.authser.isLoggedIn
    // console.log('loginstatus : ' + this.loginstatus)

  }
}
