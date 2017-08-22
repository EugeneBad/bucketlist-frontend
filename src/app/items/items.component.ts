import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

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
   backgroundColor: ['green', 'gold']}]

   public itemsArray:any = [{"name": "See the pyramids in Cairo", "creation_date": "2017-12-8"},
                 {"name": "Climb the Himalayas", "creation_date": "2017-5-7"},
                 {"name": "Drive a Maseratti on the AutoBahn", "creation_date": "2017-9-13"}
                ]

  @Input () bucketlist_id;
  @Input () q;

  constructor() { }
  ngOnInit() {

  }

}
