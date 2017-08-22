import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { GetBucketlistsService } from '../get-bucketlists.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ItemsComponent implements OnInit {
  public pieChartLabels:string[] = ['Completed', 'Pending'];
  public pieChartData:number[] = [3, 5];
  public pieChartType:string = 'doughnut';
  public pieChartColors: Array < any > = [{
   backgroundColor: ['green', 'gold']}];

  itemsBucketlist: string = "";
  itemsArray:any = "";


  @Input () bucketlist_id;
  @Input () q;

  constructor(private http: Http, private fetch: GetBucketlistsService) { }
  ngOnInit() {
    this.fetchItems();
  }

  fetchItems(){
    if (this.itemsBucketlist != ""){
      this.http.get(`http://localhost:5000/api/V1/bucketlists/${this.itemsBucketlist}/items`, {headers: this.fetch.headers })
      .subscribe(data => {let response = data.json();
      this.itemsArray =  response.Items; console.log(this.itemsArray);} )
    }

  }
ngOnChanges(changes: SimpleChanges){
  this.itemsBucketlist = changes.bucketlist_id.currentValue;
  this.fetchItems();
}

}
