import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class itemDeleteService {
  headers = new Headers();
  constructor(private http: Http) {}

  delete(bucketlist_id, item_id){
    this.headers.append('token', sessionStorage.getItem('token'));
    return this.http.delete(`http://localhost:5000/api/V1/bucketlists/${bucketlist_id}/items/${item_id}`, {headers: this.headers })
  }

}
