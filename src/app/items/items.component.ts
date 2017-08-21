import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items:any = '';

  @Input () bucketlist_id;
  @Input () q;

  constructor() { }

  ngOnInit() {
  }

}
