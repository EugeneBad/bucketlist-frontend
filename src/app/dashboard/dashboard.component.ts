import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { GetBucketlistsService } from '../get-bucketlists.service';
import { faderAnimation } from '../fader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ faderAnimation ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  // Variables to control the querying of bucketlists/items.

  requested_bucketlist: string;
  q: string = '';

  // Variables to control transitions between bucketlists and items.
  context: string = 'bucketlist';
  loadItems: string;
  loadBucketlists: string;
  hideBucketlists: boolean;
  hideItems: boolean;

  // Adding new bucketlist/item notifications.
  new_add: string = '';
  missing_new_name: boolean;
  duplicate_new_name: boolean;
  successful_new_add: boolean;

  constructor(private http: Http, private fetch: GetBucketlistsService) {
    this.hideBucketlists = false;
    this.hideItems = true;
    this.loadItems = 'out';
    this.loadBucketlists = 'in';
    this.reset();
  }

  ngOnInit() {
  }

  reset() {
    this.missing_new_name = false;
    this.duplicate_new_name = false;
    this.successful_new_add = false;
  }

  search(eventData: any) {
    this.q = eventData.target.value;

    if (this.context == 'bucketlist') {
    }
    if (this.context == 'item') {
    }
  }

  add(event) {
    let body = new FormData();
    body.set('name', this.new_add);

    if (this.context == 'bucketlist') {
      this.http.post('http://localhost:5000/api/V1/bucketlists', body, { headers: this.fetch.headers })
        .subscribe(data => this.validate(data), err => this.validate(err));
    }
    if (this.context == 'item') {
      this.http.post(`http://localhost:5000/api/V1/bucketlists/${this.requested_bucketlist}/items`, body, { headers: this.fetch.headers })
        .subscribe(data => this.validate(data), err => this.validate(err));
    }
  }

  validate(response) {
    let response_code = response.status;

    if (response_code == 409) {
      this.reset();
      this.duplicate_new_name = true;
    }
    if (response_code == 400) {
      this.reset();
      this.missing_new_name = true;
    }

    if (response_code == 200) {

      this.reset();
      this.successful_new_add = true;
      this.new_add = '';
      // Reload component here.
      let self = this;
      setTimeout(function() { self.successful_new_add = false; }, 2000);
    }
  }

  // Callback function called at the end of id=bucketlists div transition from
  // in to out.
  showItems(event) {
    if (event.fromState == 'in' && event.toState == 'out') {
      this.hideBucketlists = true;
      this.hideItems = false;
      this.loadItems = 'in';
      this.toggleContext();
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
      this.toggleContext();
      this.loadBucketlists = 'in';
    }
  }

  toggleLoadItems(event) {

    this.requested_bucketlist = event.target.id.split('_')[2];
    this.loadBucketlists = 'out';
  }

  toggleLoadBucketlists() {
    this.loadItems = 'out';
  }

  toggleContext() {
    this.context = (this.context == 'bucketlist') ? 'item' : 'bucketlist';
  }
}
