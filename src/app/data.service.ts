import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface DataFeedItem extends Array<DataFeedItem> {
  bank_name: string;
  bank_id: number;
  state: string;
  district: string;
  city: string;
  address: string;
  branch: string;
  ifsc: string;
  favourite: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  returnvalue: any;

  constructor(private httpClient: HttpClient) { }

  getData(city: string) {
    this.returnvalue = [];
    let url = "https://vast-shore-74260.herokuapp.com/banks?city=" + city;
    return this.httpClient.get<DataFeedItem>(url);
  }
}
