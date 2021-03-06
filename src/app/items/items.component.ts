import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges, SimpleChanges } from '@angular/core';
import { itemAddService } from './services/add.service';
import { itemFetchService } from './services/fetch.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  encapsulation: ViewEncapsulation.None // Allows for use of custom css
})
export class ItemsComponent implements OnInit {
  // Pie chart variables
  public pieChartLabels: string[] = ['Completed', 'Pending'];
  public pieChartData: any[];
  public pieChartType: string = 'doughnut';
  public pieChartColors: Array<any> = [{
    backgroundColor: ['green', 'goldenrod']
  }];

  itemsBucketlist: string = "";
  completedItems: any = [];
  pendingItems: any = [];
  bucketlistName: string;

  header = new Headers();

  new_add: string = "";
  duplicate_name: boolean;
  successful_name: boolean;

  constructor(private itemAddService: itemAddService, private itemFetchService: itemFetchService) { }
  ngOnInit() {
    this.header.append('token', sessionStorage.getItem('token'));

    this.fetchItems();
  }

  fetchItems() {
    if (this.itemsBucketlist != "") {
      this.itemFetchService.fetch(this.itemsBucketlist)
        .subscribe(data => {
          let response = data.json();
          for (let item of response.Items) {
            if (item.done) {
              this.completedItems.push(item);
            }
            if (!item.done) {
              this.pendingItems.push(item);
            }
          }
          this.bucketlistName = response.bucketlist_name;
        })
    }

  }

  refresh() {
    this.completedItems = [];
    this.pendingItems = [];
    this.fetchItems();
  }

  add() {
    let body = new FormData();
    if (this.new_add != "") {
      body.set('name', this.new_add);
    }
    this.itemAddService.add(this.itemsBucketlist, body)
      .subscribe(data => this.validate(data), err => this.validate(err));

  }

  validate(response) {
    let response_code = response.status;

    if (response_code == 409) {
      this.duplicate_name = true;
      let self = this;
      setTimeout(function() { self.duplicate_name = false; }, 2000);
    }

    if (response_code == 200) {
      this.successful_name = true;
      let self = this;
      setTimeout(function() {
      self.successful_name = false;
        self.new_add = "";
        self.refresh()
      }, 1000);
    }
  }
}
