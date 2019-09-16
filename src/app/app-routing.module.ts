import { LocationFormComponent } from './dashboard/location/location-form/location-form.component';
import { CitiesListComponent } from './dashboard/cities/cities-list/cities-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorFormComponent } from './dashboard/vendors/vendor-form/vendor-form.component';
import { VendorsListComponent } from './dashboard/vendors/vendors-list/vendors-list.component';
import { ModelsListComponent } from './dashboard/models/models-list/models-list.component';
import { ModelComponent } from './dashboard/models/model/model.component';
import { BrandListComponent } from './dashboard/brands/brand-list/brand-list.component';
import { AreaFormComponent } from './dashboard/areas/area-form/area-form.component';
import { BrandFormComponent } from './dashboard/brands/brand-form/brand-form.component';
import { CityFormComponent } from './dashboard/cities/city-form/city-form.component';
import { ModelFormComponent } from './dashboard/models/model-form/model-form.component';
import { FleetListComponent } from './dashboard/fleet/fleet-list/fleet-list.component';
import { FleetFormComponent } from './dashboard/fleet/fleet-form/fleet-form.component';
import { LocationListComponent } from './dashboard/location/location-list/location-list.component';
import { TestComponent } from './dashboard/test/test.component';
import { PartsComponent } from './dashboard/parts/parts.component';
import { PartFormComponent } from './dashboard/parts/part-form/part-form.component';
import { NotFoundComponent } from './shared component/not-found/not-found.component';
import { CarsListComponent } from './dashboard/cars/cars-list/cars-list.component';
import { CarFormComponent } from './dashboard/cars/car-form/car-form.component';
import { UnitsComponent } from './dashboard/units/units.component';
import { UnitFormComponent } from './dashboard/units/unit-form/unit-form.component';
// import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FooterComponent } from './shared component/footer/footer.component';
import { HomeComponent } from './website/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { ForbiddenComponent } from './shared component/forbidden/forbidden.component';
// import { SignInComponent } from './auth/sign-in/sign-in.component';


const routes: Routes = [
  // ANY ONE CAN ACCESS
  { path: '', component: FooterComponent },
  { path: 'home', component: HomeComponent },
  //ADMIN ACCESS
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['admin'] }, children: [
      { path: 'parts/:flag1', component: PartFormComponent },
      { path: 'parts/:flag1/:id', component: PartFormComponent },
      { path: 'parts', component: PartsComponent },
      { path: 'brands/:flag1', component: BrandFormComponent },
      { path: 'brands/:flag2/:id', component: BrandFormComponent },
      { path: 'brand/:id/models', component: ModelsListComponent },
      { path: 'brands', component: BrandListComponent },
      { path: 'models', component: ModelComponent },
      { path: 'models/:flag1', component: ModelFormComponent },
      { path: 'models/:id/:flag1', component: ModelFormComponent },
      { path: 'cities', component: CitiesListComponent },
      { path: 'cities/:flag1', component: CityFormComponent },
      { path: 'cities/:id/:flag1', component: CityFormComponent },
      { path: 'city/:id/areas', component: TestComponent },
      { path: 'areas', component: TestComponent },
      { path: 'city/:id/:flag2', component: AreaFormComponent },
      { path: 'areas/addArea', component: AreaFormComponent },
      { path: 'areas/:id/:flag2', component: AreaFormComponent },
      { path: 'cars', component: CarsListComponent },
      { path: 'cars/:flag1', component: CarFormComponent },
      { path: 'cars/:flag2/:id', component: CarFormComponent },
      { path: 'units', component: UnitsComponent },
      { path: 'units/:flag1', component: UnitFormComponent },
      { path: 'units/:flag2/:id', component: UnitFormComponent },
    ]
  },



  { path: 'fleet', component: FleetListComponent },
  { path: 'location', component: LocationListComponent },
  { path: 'vendors', component: VendorsListComponent },
  { path: 'vendor', component: VendorFormComponent },
  { path: 'areas/:id', component: TestComponent },
  { path: 'vendors/:flag1', component: VendorFormComponent },
  { path: 'vendors/:flag2/:id', component: VendorFormComponent },
  { path: 'fleet/:flag1', component: FleetFormComponent },
  { path: 'fleet/:flag2/:id', component: FleetFormComponent },
  { path: 'addLocation/:flag1', component: LocationFormComponent },
  { path: 'editLocation/:flag2/:id', component: LocationFormComponent },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
