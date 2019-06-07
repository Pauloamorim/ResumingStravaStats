import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities() {
	  return this.http.get('https://www.strava.com/api/v3/athlete/activities',
	  	{ headers: new HttpHeaders().set('Authorization', 'Bearer 950f849c4f7d15f1f91f0dfa5ad2cc68ec3d2f7a')});
  }

}
