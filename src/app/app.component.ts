import { Component, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title = 'KlaarFinal';

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns = ['bank_name', 'branch', 'city', 'ifsc', 'address', 'district', 'state', 'bank_id'];
  cityList = ['VISAKHAPATNAM', 'HYDERABAD', 'BANGALORE', 'CHENNAI', 'MYSORE'];
  dataSource!: MatTableDataSource<any>;
  dataFeed: any;

  constructor(private service: DataService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }

  fetchData(city: string) {
    this.service.getData(city).subscribe(Response => {
      this.dataFeed = Response;
      this.refreshData();
    });
  }

  refreshData() {
    this.dataSource = new MatTableDataSource(this.dataFeed);
    this.dataSource.paginator = this.paginator;
  }

  filter($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
