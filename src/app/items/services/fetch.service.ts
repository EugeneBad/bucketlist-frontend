import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class itemFetchService {
  headers = new Headers();
  constructor(private http: Http) {}

  fetch(itemsBucketlist){
    this.headers.append('token', sessionStorage.getItem('token'));
    return this.http.get(`http://localhost:5000/api/V1/bucketlists/${itemsBucketlist}/items`, { headers: this.headers })
  }

}
