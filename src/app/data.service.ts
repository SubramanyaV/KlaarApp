import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getData(city: string) {
    let url = "https://vast-shore-74260.herokuapp.com/banks?city=" + city;
    return this.httpClient.get(url);
  }
}