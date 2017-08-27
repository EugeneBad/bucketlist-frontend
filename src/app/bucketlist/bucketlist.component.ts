import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { bucketlistFetchService } from './services/fetch.service';
import { bucketlistAddService } from './services/add.services';
import { bucketlistEditService } from './services/edit.service';
import { bucketlistDeleteService } from './services/delete.service';
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

  duplicate_name:boolean = false;
  successful_name:boolean = false;

  @Input() bucketlist;
  @Output() onClickItem = new EventEmitter();

  constructor(private bucketlistFetchService: bucketlistFetchService,
              private bucketlistAddService: bucketlistAddService,
              private bucketlistEditService: bucketlistEditService,
              private bucketlistDeleteService: bucketlistDeleteService,
              private router: Router) {
  }

  ngOnInit() {
    this.getBucketlists();
  }

  getBucketlists() {
    this.bucketlistFetchService.fetch(this.offset, this.q)
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

    this.bucketlistAddService.add(body)
             .subscribe(data => this.validate(data), err => this.validate(err));
    }

  getItems(event){
    this.onClickItem.emit(event);
  }

  deleteBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];
    this.bucketlistDeleteService.delete(bucketlistId)
    .subscribe(data => this.getBucketlists());
  }

  editBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];

    let body = new FormData();
    body.set('name', this.edited_name);

      this.bucketlistEditService.edit(bucketlistId, body)
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
