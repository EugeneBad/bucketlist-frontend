import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css']
})
export class BucketlistComponent implements OnInit {

  @Input() bucketlist;

  constructor() { }

  ngOnInit() {
  }

}
