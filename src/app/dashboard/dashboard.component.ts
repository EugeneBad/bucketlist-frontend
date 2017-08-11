import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  token: string;
  bucketlists: any;
  offset: number = 1;
  q: string = '';


  constructor(private http: Http, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.token = params['token']; this.getBucketlists() });

  }

  ngOnInit() {

  }

  getBucketlists() {

    let headers = new Headers();
    headers.append('token', this.token);

    this.http.get(`http://localhost:5000/api/V1/bucketlists?limit=4&offset=${this.offset}&q=${this.q}`, { headers: headers })
      .subscribe(data => { this.bucketlists = JSON.parse(JSON.parse(JSON.stringify(data))._body).Bucketlists })

  }

  search(eventData: any) {
    this.q = eventData.target.value;
    this.getBucketlists();

  }
}
