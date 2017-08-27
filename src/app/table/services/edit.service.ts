import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';


@Injectable()
export class itemEditService {
  headers = new Headers();
  constructor(private http: Http) {}

  edit(bucketlist_id, item_id, body){
    this.headers.append('token', sessionStorage.getItem('token'));
    return this.http.put(`http://localhost:5000/api/V1/bucketlists/${bucketlist_id}/items/${item_id}`, body, {headers: this.headers })
  }

}
