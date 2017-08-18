import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.css']
})
export class BucketlistComponent implements OnInit {

  @Input() bucketlist;
  @Output() onClickItem = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  getItems(){
    this.onClickItem.emit();
  }


}
