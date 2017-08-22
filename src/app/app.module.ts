import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { ItemsComponent } from './items/items.component';
import { BucketlistComponent } from './bucketlist/bucketlist.component';
import { LoggedInGuard } from './logged-in.guard';
import { GetBucketlistsService } from './get-bucketlists.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdMenuModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { TableComponent } from './table/table.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [LoggedInGuard],
  },
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
  providers: [DatePipe, GetBucketlistsService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
