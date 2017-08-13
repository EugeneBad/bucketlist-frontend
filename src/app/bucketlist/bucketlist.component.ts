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
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = 'assets/js/bcktlst_btns.js';
    head.appendChild(script);
  }

}
