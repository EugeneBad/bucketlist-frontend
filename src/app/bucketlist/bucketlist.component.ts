import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { faderAnimation } from '../fader';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css'],
  animations: [ faderAnimation ],
  encapsulation: ViewEncapsulation.None
})
export class BucketlistComponent implements OnInit {

  offset: number = 1;
  response: any = '';
  bucketlists: any = '';
  fade:string = 'in';
  q:string = "";
  edited_name:string;
  new_add: string = '';

  header = new Headers();

  duplicate_name:boolean = false;
  successful_name:boolean = false;

  @Input() bucketlist;
  @Output() onClickItem = new EventEmitter();

  constructor(private http: Http, private router: Router) {

  }

  ngOnInit() {
    // Initialise component with headers abd fetch the bucketlists.
    this.header.append('token', sessionStorage.getItem('token'));
    this.getBucketlists();
  }

  getBucketlists() {
    this.http.get(`http://localhost:5000/api/V1/bucketlists?limit=4&offset=${this.offset}&q=${this.q}`, { headers: this.header })
    .subscribe(data => {
      this.response = data.json();
      this.bucketlists =  this.response.Bucketlists;
    },
      // In case of an error response (4xx), just redirect to login.
      err => this.router.navigate(['/home'])
    );
  }
  // Callback for keyup event in the search box.
  search(eventData: any) {
    this.q = eventData.target.value;
    this.getBucketlists();
  }
  // Callback for click event on next button.
  next() {
    this.offset += 1;
    this.getBucketlists();
  }
  // Callback for click event on prev button.
  prev() {
    this.offset -= 1;
    this.getBucketlists();
  }

  add(event) {
    let body = new FormData();
    body.set('name', this.new_add);

    this.http.post('http://localhost:5000/api/V1/bucketlists', body, { headers: this.header })
             .subscribe(data => this.validate(data), err => this.validate(err));
    }

  getItems(event){
    this.onClickItem.emit(event);
  }

  deleteBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];
    this.http.delete(`http://localhost:5000/api/V1/bucketlists/${bucketlistId}`,{headers: this.header})
    .subscribe(data => this.getBucketlists());
  }

  editBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];

    let body = new FormData();
    body.set('name', this.edited_name);

      this.http.put(`http://localhost:5000/api/V1/bucketlists/${bucketlistId}`, body, { headers: this.header })
        .subscribe(data => this.validate(data), err => this.validate(err));
  }

  validate(response){
    let response_code = response.status;

    if (response_code == 409) {
      this.duplicate_name = true;
      let self = this;
      setTimeout(function() { self.duplicate_name = false; }, 2000);
    }

    if (response_code == 200){
      this.successful_name = true;
      let self = this;
      setTimeout(function() { self.successful_name = false;
                              self.getBucketlists();
                              self.new_add = "";
                              self.edited_name = '';}, 2000);
    }
  }
}
