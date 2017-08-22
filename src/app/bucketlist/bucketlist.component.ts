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
  }
  editBucketlist(event){
    let bucketlistId = event.target.id.split('_')[2];
  }
}
