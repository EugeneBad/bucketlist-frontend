import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GetBucketlistsService {

  headers = new Headers();
  token: string;
  status:boolean;

  constructor(private http: Http, private route: ActivatedRoute ) {

      this.token = sessionStorage['token'];
      this.headers.append('token', this.token);
      console.log(this.token);
      this.fetchBucketlists().subscribe(data => sessionStorage.setItem('status', 'true'), err => sessionStorage.setItem('status', 'false'),);

  }

  fetchBucketlists(offset=1, q=''){
    return this.http.get(`http://localhost:5000/api/V1/bucketlists?limit=4&offset=${offset}&q=${q}`, { headers: this.headers });
  }
}
