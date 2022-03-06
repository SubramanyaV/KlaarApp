import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataFeedItem, DataService } from './data.service';
import {FavouriteService} from './favourite.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges,OnInit {
  title = 'KlaarFinal';

  @ViewChild('paginator') paginator: MatPaginator;

  displayedColumns = ['favourite','bank_name', 'branch', 'city', 'ifsc', 'address', 'district', 'state', 'bank_id'];
  cityList = ['VISAKHAPATNAM', 'HYDERABAD', 'BANGALORE', 'CHENNAI', 'MYSORE'];
  dataSource!: MatTableDataSource<any>;
  dataFeed: any;
  dataFeedFavourite: any;

  constructor(private service: DataService, private populateService : FavouriteService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.refreshData();
  }

  fetchData(city: string) {
    this.service.getData(city).subscribe(Response => {
      this.dataFeedFavourite = this.populateService.populateFavourite(Response);
      this.dataFeedFavourite = this.populateService.checkFavourite(this.dataFeedFavourite);
      this.dataFeed = this.dataFeedFavourite;
      this.refreshData();
    });
  }

  refreshData() {
    this.dataFeedFavourite = this.populateService.checkFavourite(this.dataFeedFavourite);
    this.dataSource = new MatTableDataSource(this.dataFeedFavourite);
    this.dataSource.paginator = this.paginator;
  }

  filter($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  toggleFavourite(index: number){
    this.dataFeedFavourite  = this.populateService.toggleFavouriteService(index, this.dataFeedFavourite);
    this.refreshData();
  }

  ngOnInit(): void {
      this.populateService.persistToggle();
  }
}
