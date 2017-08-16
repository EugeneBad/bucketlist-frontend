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
    this.refresh_jq();
  }

  refresh_jq(){
    let script = document.getElementById('bcktlst_btns');
    let head = document.getElementsByTagName('head')[0];
    script.parentNode.removeChild(script);

    let rescript = document.createElement('script');
    rescript.src = 'assets/js/bcktlst_btns.js';
    rescript.id = 'bcktlst_btns';
    head.appendChild(rescript);
  }

}
