import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';

@Injectable()
export class GetBucketlistsService {

  headers = new Headers();
  token: string;


  constructor(private http: Http, private route: ActivatedRoute, ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.headers.append('token', this.token);
      console.log(this.token);

    });
  }

  fetchBucketlists(offset=1, q=''){
    return this.http.get(`http://localhost:5000/api/V1/bucketlists?limit=4&offset=${offset}&q=${q}`, { headers: this.headers });
  }

}
