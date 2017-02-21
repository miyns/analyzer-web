import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AnalyzerApiService } from './analyzer-api.service';

import { AppComponent } from './app.component';
import { DetailChartComponent } from './detail-chart/detail-chart.component';
import { ChartsModule } from 'ng2-charts'

// import { NvD3Module } from 'nvd3';

@NgModule({
  declarations: [
    AppComponent,
    DetailChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
    // NvD3Module
  ],
  providers: [AnalyzerApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
