import { Component, OnInit } from '@angular/core';
import { GetBucketlistsService } from '../get-bucketlists.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
        state('true', style({opacity:1})),
        transition('* => true', animate('1s 0.9s ease-out'))
    ])
]
})
export class DashboardComponent implements OnInit {
  response: any = '';
  bucketlists: any = '';
  offset: number = 1;
  q: string = '';
  loaded:string;
  new_bucketlist: string = '';
  missing_bcktlst_name: boolean;
  duplicate_bcktlst_name: boolean;
  successful_bcktlst_add: boolean;

  constructor(private fetch: GetBucketlistsService, private http: Http, private router: Router) {
    this.loaded = 'true';
    this.getBucketlists();
    this.reset();
  }

  ngOnInit() {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = 'assets/js/bcktlst_btns.js';
    script.id = 'bcktlst_btns'
    head.appendChild(script);
  }

  reset() {
    this.missing_bcktlst_name = false;
    this.duplicate_bcktlst_name = false;
    this.successful_bcktlst_add = false;
  }

  getBucketlists() {

    this.fetch.fetchBucketlists(this.offset, this.q).subscribe(data => {
      this.response = data.json();
      this.bucketlists =  this.response.Bucketlists;
    },
      err => this.router.navigate(['/home'])
    );
  }

  search(eventData: any) {
    this.offset = 1;
    this.q = eventData.target.value;
    this.getBucketlists();
  }

  next() {
    this.offset += 1;
    this.getBucketlists();
  }

  prev() {
    this.offset -= 1;
    this.getBucketlists();
  }

  add() {
    let body = new FormData();
    body.set('name', this.new_bucketlist);
    console.log(body.get('name'));
    this.http.post('http://localhost:5000/api/V1/bucketlists', body, { headers: this.fetch.headers })
      .subscribe(data => this.validate(data), err => this.validate(err));

  }

  validate(response) {
    let response_code = response.status;

    if (response_code == 409) {
      this.reset();
      this.duplicate_bcktlst_name = true;
    }
    if (response_code == 400) {
      this.reset();
      this.missing_bcktlst_name = true;
    }

    if (response_code == 200) {

      this.reset();
      this.successful_bcktlst_add = true;
      this.new_bucketlist = '';
      this.getBucketlists();
      let self = this;
      setTimeout(function() { self.successful_bcktlst_add = false; }, 2000);
    }

  }

}
