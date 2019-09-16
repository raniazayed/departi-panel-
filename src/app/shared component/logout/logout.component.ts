import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private dialogRef:MatDialogRef<LogoutComponent>,private authService:AuthService) { }

  ngOnInit() {
  }
  onlogout(){
    this.authService.logout();
    if(this.authService.getRole()=='admin'){
      this.router.navigate(["/brands"]);
    }else{
      this.router.navigate(["/home"]);
    }
    this.closeModal()
  }
  closeModal(){   
    this.dialogRef.close('Pizza!');
  }

}
