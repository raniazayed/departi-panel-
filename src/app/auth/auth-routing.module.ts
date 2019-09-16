import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";


const authRoutes:Routes = [
  {path: 'signin', component: SignInComponent},
  {path: 'signup/:flag1', component: SignUpComponent},
  { path: 'vendor/:id/:flag1', component: SignUpComponent },
  { path: 'fleet/:id/:flag1', component: SignUpComponent },
  { path: 'user/:id/:flag1', component: SignUpComponent }


];
@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
