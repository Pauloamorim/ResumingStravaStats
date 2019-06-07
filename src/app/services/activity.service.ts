import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities() {
	  return this.http.get('https://www.strava.com/api/v3/athlete/activities',
	  	{ headers: new HttpHeaders().set('Authorization', 'Bearer 640f34eae60d6565bff043e0122908be550caaa5')});
  }

}
