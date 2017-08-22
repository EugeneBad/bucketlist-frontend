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


  @Input () bucketlist_id;

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
ngOnChanges(changes: SimpleChanges){
  this.itemsBucketlist = changes.bucketlist_id.currentValue;
  this.fetchItems();
}

}
