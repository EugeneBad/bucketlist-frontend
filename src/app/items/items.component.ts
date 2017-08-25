import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {
  public pieChartLabels:string[] = ['Completed', 'Pending'];
  public pieChartData:any[];
  public pieChartType:string = 'doughnut';
  public pieChartColors: Array < any > = [{
   backgroundColor: ['green', 'goldenrod']}];

  itemsBucketlist: string = "";
  completedItems:any = [];
  pendingItems:any = [];
  bucketlistName:string;

  header = new Headers();

  new_add:string = "";
  duplicate_name:boolean;
  successful_name:boolean;

  constructor(private http: Http) { }
  ngOnInit() {
    this.header.append('token', sessionStorage.getItem('token'));

    this.fetchItems();
  }

  fetchItems(){
    if (this.itemsBucketlist != ""){
      this.http.get(`http://localhost:5000/api/V1/bucketlists/${this.itemsBucketlist}/items`, {headers: this.header })
      .subscribe(data => {let response = data.json();
        for (let item of response.Items){
          if (item.done){
            this.completedItems.push(item);
          }
          if (!item.done){
            this.pendingItems.push(item);
          }
        }
      this.bucketlistName = response.bucketlist_name;} )
    }

  }

refresh(){
  this.completedItems = [];
  this.pendingItems = [];
  this.fetchItems();
}

add(){
  let body =new FormData();
  if (this.new_add != ""){
    body.set('name', this.new_add);
  }
  this.http.post(`http://localhost:5000/api/V1/bucketlists/${this.itemsBucketlist}/items`, body, { headers: this.header })
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
                            self.new_add = "";
                            self.refresh()}, 1000);
   }
  }
}
