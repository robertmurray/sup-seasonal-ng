import {
  Injectable,
  Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MonthsResults } from '../months-results/months-results.model';

export const API_URL = 'http://supseasonal.herokuapp.com/api/';

@Injectable()
export class SearchMonthsService {
  constructor(private http: Http,
    @Inject(API_URL) private apiUrl: string) {

    }

    search(month: string): Observable<MonthsResults[]> {
      let queryUrl = `${this.apiUrl}months/${month}`;
      console.log("apiUrl:", this.apiUrl)
      return this.http.get(queryUrl)
        .map((response: Response) => {
          console.log("in search");
          // return console.log(response);
          return (<any>response.json()).map(item => {
            console.log("raw item", item);
            return new MonthsResults({
              foodName: item.food_name,
              jan: item.jan,
              feb: item.feb,
              mar: item.mar,
              apr: item.apr,
              may: item.may,
              jun: item.jun,
              jul: item.jul,
              aug: item.aug,
              sep: item.sep,
              oct: item.oct,
              nov: item.nov,
              dec: item.dec
            })
          })
        })
    }
}
