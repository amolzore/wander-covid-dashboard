import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8094/v1/api/covid-dashboard';
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
}
