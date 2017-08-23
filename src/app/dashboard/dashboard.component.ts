import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { faderAnimation } from '../fader';
import { BucketlistComponent } from '../bucketlist/bucketlist.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ faderAnimation ]
})
export class DashboardComponent implements OnInit {
  // Variables to control the querying of bucketlists/items.


  requested_bucketlist: string = "";

  // Variables to control transitions between bucketlists and items.
  loadItems: string;
  loadBucketlists: string;
  hideBucketlists: boolean;
  hideItems: boolean;

  @ViewChild(BucketlistComponent)
  private bucketlistComponent: BucketlistComponent;

  constructor(private http: Http, private router: Router ) {
    this.hideBucketlists = false;
    this.hideItems = true;
    this.loadItems = 'out';
    this.loadBucketlists = 'in';
  }

  ngOnInit() {
  }

  // Callback function called at the end of id=bucketlists div transition from
  // in to out.
  showItems(event) {
    if (event.fromState == 'in' && event.toState == 'out') {
      this.hideBucketlists = true;
      this.hideItems = false;
      this.loadItems = 'in';
      this.loadBucketlists = '';
    }
  }

  // Callback function called at the end of id=items div transition from
  // in to out.
  showBucketlists(event) {
    if (event.fromState == 'in' && event.toState == 'out') {
      this.hideBucketlists = false;
      this.hideItems = true;
      this.loadItems = '';
      this.loadBucketlists = 'in';
    }
  }

  toggleLoadItems(event) {

    this.requested_bucketlist = event.target.id.split('_')[2];
    this.loadBucketlists = 'out';
  }

  toggleLoadBucketlists() {

    this.bucketlistComponent.getBucketlists();
    this.loadItems = 'out';
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
