import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetBucketlistsService } from '../get-bucketlists.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { faderAnimation } from '../fader';


@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css'],
  animations: [ faderAnimation ]
})
export class BucketlistComponent implements OnInit {

  offset: number = 1;
  response: any = '';
  bucketlists: any = '';
  fade:string = 'in';
  edited_name:string;

  duplicate_edit_name:boolean = false;
  successful_edit:boolean = false;

  @Input() bucketlist;
  @Input() q;
  @Output() onClickItem = new EventEmitter();

  constructor(private fetch: GetBucketlistsService, private http: Http, private router: Router) {
    this.getBucketlists();
  }

  ngOnInit() {
  }

  getBucketlists() {

    this.fetch.fetchBucketlists(this.offset, this.q).subscribe(data => {
      this.response = data.json();
      this.bucketlists =  this.response.Bucketlists;
    },
      err => this.router.navigate(['/home'])
    );
  }

  next() {
    this.offset += 1;
    this.getBucketlists();
  }

  prev() {
    this.offset -= 1;
    this.getBucketlists();
  }

  getItems(event){
    this.onClickItem.emit(event);
  }
  deleteBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];
    this.http.delete(`http://localhost:5000/api/V1/bucketlists/${bucketlistId}`,{headers: this.fetch.headers})
    .subscribe(data => this.getBucketlists());
  }
  editBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];

    let body = new FormData();
    body.set('name', this.edited_name);
    console.log(bucketlistId);

      this.http.put(`http://localhost:5000/api/V1/bucketlists/${bucketlistId}`, body, { headers: this.fetch.headers })
        .subscribe(data => this.validate(data), err => this.validate(err));

  }
  validate(response){
    let response_code = response.status;

    if (response_code == 409) {
      this.duplicate_edit_name = true;
      let self = this;
      setTimeout(function() { self.duplicate_edit_name = false; }, 2000);
    }

    if (response_code == 200){
      this.successful_edit = true;
      let self = this;
      setTimeout(function() { self.successful_edit = false;
                              self.getBucketlists();
                              self.edited_name = '';}, 2000);
    }
  }
}
