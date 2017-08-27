import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class itemAddService {
  headers = new Headers();
  constructor(private http: Http) {}

  add(itemsBucketlist, body){
    this.headers.set('token', sessionStorage.getItem('token'));
    return this.http.post(`http://localhost:5000/api/V1/bucketlists/${itemsBucketlist}/items`, body, { headers: this.headers })
  }

}
