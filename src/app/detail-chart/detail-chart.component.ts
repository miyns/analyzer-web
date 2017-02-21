import { Component, OnInit, Input } from '@angular/core';
import { AnalyzerApiService } from '../analyzer-api.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail-chart',
  templateUrl: './detail-chart.component.html',
  styleUrls: ['./detail-chart.component.css'],

  providers: [AnalyzerApiService]
})
export class DetailChartComponent implements OnInit {

  @Input()
  data: any[] = [];
  errorMessage: string;

  chartData:any[] = [];
  chartLabels:any[] = [];
  chartOptions:any = {
    responsive: false
  }
  chartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  // 連想配列でkeyを列挙（html側で取得）
  // keys(): Array<string> {
  //   return Object.keys(this.chartValue);
  // }

  // chartColors: string[] = [
  //   "#E8F5E9",
  //   "#C8E6C9",
  //   "#A5D6A7",
  //   "#81C784",
  //   "#66BB6A",
  //   "#4CAF50",
  //   "#43A047",
  //   "#388E3C",
  //   "#2E7D32",
  //   "#1B5E20"
  // ];

  constructor(private apiService: AnalyzerApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    this.chartData = [];
    if (this.data['target'] == undefined) {
      return;
    }
    console.log(changes.data);
    this.apiService.getVWeekGroupByWeekTargetDetail(this.data)
      // .groupBy( value => value.date.slice(0,4))
      .subscribe(
      value => {
        var currentkey = value[0].date.slice(0, 4);
        var rowsArray: string[] = [];
        var innerIndex :number = 0;
        var seriesIndex = 0;
        this.chartLabels = [];

        for (var row of value) {
          //console.log(row.date.slice(0,4));
          var key = row.date.slice(0, 4)
          if (currentkey != key) {
            this.chartData.push({
              data:rowsArray,
              label:currentkey,
            });
            seriesIndex+=1;
            currentkey = key;
            innerIndex = 0;
            row['idx'] = innerIndex;
            rowsArray = [row.open];//1件目はopenでやりたいがopenとってなかった
            innerIndex+=1;
            if(seriesIndex == 0){
              this.chartLabels.push(row['week'] + '-' + innerIndex);
            }
            continue;
          }
          row['idx'] = innerIndex;
          rowsArray.push(row.close);//ここはcloseでいい
          innerIndex+=1;
        }
        if (rowsArray.length > 0) {
            this.chartData.push({
              data:rowsArray,
              label:currentkey,
            });
        }

        
        var len = rowsArray.length;
        for(var i = 0 ; i < len ;i++){
          this.chartLabels.push(Math.trunc((this.data['week'] - 1) + i / 5) + "-" + (i % 5 + 1));  
        }

        // console.log("results:" + this.chartValue[0]['values'][0]['date']);
        console.log("data out start");
        // for(var series of this.chartValue){
        //   var values = series['values'];
        //   for(var row of values){
        //     console.log(series['key'] + " " + row['idx'] + " " + row['date'] + " " + row['close']);
        //   }
        // }
        console.log(this.chartData);

        console.log("data out end");
      },
      function (err) {
        console.log('Error: ' + err);
      },
    );
  }


}
