import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl + '/v1/api/covid-dashboard';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getCountries(): Observable<any> {
    return this.http.get(API_URL +'/countries', httpOptions);
  }
  getAllCaseFromDayOneTotalGraphDataByCountry(country: String): Observable<any> {
    console.log(API_URL +'/graph-data/day-one-total-all-status/' + country);
    return this.http.get(API_URL +'/graph-data/day-one-total-all-status/' + country, httpOptions);
  }
  getGraphDataSummary(country: String): Observable<any> {
    console.log(API_URL +'/graph-data/summary');
    return this.http.get(API_URL +'/graph-data/summary', httpOptions);
  }
}
