import { Injectable } from '@angular/core';
import { DataFeedItem } from './data.service';

@Injectable({
  providedIn: 'root'
})


export class FavouriteService {

  favouriteData: string[] = [];

  constructor() { }

  populateFavourite(res: DataFeedItem): DataFeedItem {
    for (var i = 0; i < res.length; i++)
      res[i].favourite = 'No';
    return res;
  }

  checkFavourite(data: DataFeedItem): DataFeedItem{
    for (var i = 0; i < data.length; i++)
      this.favouriteData.forEach((fav,index,)=>{if(data[i].ifsc===fav) data[i].favourite="Yes";}); 
    return data;
  }

  toggleFavouriteService(index: number, data: DataFeedItem){
    if(this.favouriteData.includes(data[index].ifsc))
    {
      data[index].favourite="No";
      this.favouriteData.splice(this.favouriteData.indexOf(data[index].ifsc),1);
    }
    else{
        this.favouriteData.push(data[index].ifsc);
        data[index].favourite = "Yes";
    }
    localStorage.setItem("saved_favourites",JSON.stringify(this.favouriteData));
    return data;
  }

  persistToggle(){
      this.favouriteData = JSON.parse(localStorage.getItem("saved_favourites"));
      if(this.favouriteData===null){
        this.favouriteData = [];
      }
  } 
}
