import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendorFormComponent } from './dashboard/vendors/vendor-form/vendor-form.component';
import { AgmCoreModule } from '@agm/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VendorsListComponent } from './dashboard/vendors/vendors-list/vendors-list.component';
import { EditVendorComponent } from './dashboard/vendors/vendors-list/edit-vendor/edit-vendor.component';
import { ModelsListComponent } from './dashboard/models/models-list/models-list.component';
import { BrandListComponent } from './dashboard/brands/brand-list/brand-list.component';
import { ModelComponent } from './dashboard/models/model/model.component';
import { CitiesListComponent } from './dashboard/cities/cities-list/cities-list.component';
import { AreaFormComponent } from './dashboard/areas/area-form/area-form.component';
import { BrandFormComponent } from './dashboard/brands/brand-form/brand-form.component';
import { CityFormComponent } from './dashboard/cities/city-form/city-form.component';
import { ModelFormComponent } from './dashboard/models/model-form/model-form.component';
import { FleetListComponent } from './dashboard/fleet/fleet-list/fleet-list.component';
import { FleetFormComponent } from './dashboard/fleet/fleet-form/fleet-form.component';
import { LocationFormComponent } from './dashboard/location/location-form/location-form.component';
import { LocationListComponent } from './dashboard/location/location-list/location-list.component';
import { TestComponent } from './dashboard/test/test.component';
import {TableModule} from 'primeng/table';
import { PartsComponent } from './dashboard/parts/parts.component';
import { PartFormComponent } from './dashboard/parts/part-form/part-form.component';
import { NavbarComponent } from './shared component/navbar/navbar.component';
import { NotFoundComponent } from './shared component/not-found/not-found.component';
import { ForbiddenComponent } from './shared component/forbidden/forbidden.component';
import { DashboardComponent } from './shared component/dashboard/dashboard.component';
import { DeleteConfirmationComponent } from './dashboard/modals/delete-confirmation/delete-confirmation.component';
import { CarsListComponent } from './dashboard/cars/cars-list/cars-list.component';
import { CarFormComponent } from './dashboard/cars/car-form/car-form.component';
import { UnitsComponent } from './dashboard/units/units.component';
import { UnitFormComponent } from './dashboard/units/unit-form/unit-form.component';

import { AuthModule } from "./auth/auth.module";
import { AuthService } from './auth/auth.service';

import { FooterComponent } from './shared component/footer/footer.component';
import { HomeComponent } from './website/home/home.component';
import { AdminComponent } from './dashboard/admin/admin.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LogoutComponent } from './shared component/logout/logout.component';
import { ProfileComponent } from './website/profile/profile.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    VendorFormComponent,
    VendorsListComponent,
    EditVendorComponent,
    ModelsListComponent,
    BrandListComponent,
    ModelComponent,
    CitiesListComponent,
    AreaFormComponent,
    BrandFormComponent,
    CityFormComponent,
    ModelFormComponent,
    FleetListComponent,
    FleetFormComponent,
    LocationFormComponent,
    LocationListComponent,
    TestComponent,
    PartsComponent,
    PartFormComponent,
    NavbarComponent,
    NotFoundComponent,
    ForbiddenComponent,
    DashboardComponent,
    DeleteConfirmationComponent,
    CarsListComponent,
    CarFormComponent,
    UnitsComponent,
    UnitFormComponent,
    
    // SignUpComponent,

    FooterComponent,
    
    HomeComponent,
    
    AdminComponent,
    
    LogoutComponent,
    
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,MatDialogModule,MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCa4SbOQFg0O7PEbRQfGp0FIFusOvkDSEg'
    }),
    TableModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [ AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[EditVendorComponent, DeleteConfirmationComponent]
})
export class AppModule { }
