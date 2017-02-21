import { Component, OnInit } from '@angular/core';
import { AnalyzerApiService } from './analyzer-api.service';
import {VWeekGroupByWeek} from './vweek-group-by-week';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] ,
  providers: [AnalyzerApiService]
})
export class AppComponent implements OnInit{
  constructor(private apiService: AnalyzerApiService) { }

  title = 'app works!';
  data:any[] = [];
  errorMessage:string = "";
  
  ngOnInit() { this.getData(); }

  getData() {
    console.log('component getData called');
    this.apiService.getVWeekGroupByWeekAny()
    .subscribe(
      value => this.data = value,
      error => this.errorMessage = <any>error
    );
  }

  selectedRow: any[] = [];
  onSelect(row: any[]): void {
    this.selectedRow = row;
  }


}

