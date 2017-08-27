// Utility imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

//Component imports
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemsComponent } from './items/items.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';

//Service imports
import { itemEditService } from './table/services/edit.service';
import { itemDeleteService } from './table/services/delete.service';

//
import { MdMenuModule, MdGridListModule, MdTabsModule } from '@angular/material';
import { LoggedInGuard } from './logged-in.guard';
import { ChartsModule } from 'ng2-charts';

// Application route definitions.
const appRoutes: Routes = [
  { path: 'home',
    component: HomeComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard], },
  { path: '',
    redirectTo:'dashboard',
    pathMatch: 'full' },
  { path: '**',
    redirectTo:'home',
    pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    DashboardComponent,
    ItemsComponent,
    BucketlistComponent,
    TableComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdMenuModule,
    MdTabsModule,
    ChartsModule

  ],
  providers: [DatePipe, LoggedInGuard, itemEditService, itemDeleteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
