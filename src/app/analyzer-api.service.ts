import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable';
// import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {VWeekGroupByWeek} from './vweek-group-by-week';

@Injectable()
export class AnalyzerApiService {

  constructor(private http:Http) {}

  urlVWeeksWeek :string = 'http://127.0.0.1:8000/api/vweeks_weektarget/';

  getVWeekGroupByWeek(): Observable<VWeekGroupByWeek[]>{
    return this.http.get(this.urlVWeeksWeek)
                    .map(res => VWeekGroupByWeek.fromJSONArray(res.json()))
                    .catch(this.handleError);
  }

  getVWeekGroupByWeekAny(): Observable<any[]>{
    return this.http.get(this.urlVWeeksWeek)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  urlVWeeksWeekDetail :string = 'http://127.0.0.1:8000/api/vweeks_week_detail/';
  getVWeekGroupByWeekTargetDetail(row :any[]): Observable<any[]>{
        return this.http.get(this.urlVWeeksWeekDetail 
        + "?target=" + row['target'] + "&week=" + row['week'])
                     //.map(res=>this.extractData(res))
                    .map(res => res.json())
                    
                    .catch(this.handleError);
  }



  private extractData(res: Response) {
    let body = res.json();
    console.log(body);

    var results:any[] = [];
    for(var row in res.json()) {
      console.log(row);

    //     // let data = new VWeekGroupByWeek(row);
    //     // results.push(data);
    }
    return results;

    // console.log('body.data = ' + body[0]['week']);
    // return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
