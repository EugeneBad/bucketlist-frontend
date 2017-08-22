import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { faderAnimation } from '../fader';

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

  constructor(private http: Http) {
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
    console.log(event);
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
    console.log(this.requested_bucketlist);
    this.loadBucketlists = 'out';
  }

  toggleLoadBucketlists() {
    this.loadItems = 'out';
  }
}
