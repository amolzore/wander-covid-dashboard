import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  globalSummary;

  dayOneTotalChartOptions: {}
  chartOptions1: {}
  summaryChartOptions:{}
  categories: String;
  confirmed: String;
  deaths: String;
  recovered: String;
  active: String;

  countryCodes: String;
  newConfirmed: String;
  totalConfirmed: String;
  newDeaths: String;
  totalDeaths: String;
  newRecovered: String;
  totalRecovered: String;
  summary_countries: String;
  constructor(private dashboardService: DashboardService) { }
  countries:{}  
  defaultCountry: String = "india";
  Highcharts = Highcharts;
  ngOnInit(): void {
    
    this.dashboardService.getCountries().subscribe(
        data=> {

            this.countries = data;
        }
    );

    this.dashboardService.getGraphDataSummary(this.defaultCountry).subscribe(
        data => {
            this.globalSummary= data.global;
            
            this.countryCodes = data.countryCodes;
            this.summary_countries = data.countries;
            this.newConfirmed = data.newConfirmed;
            this.totalConfirmed = data.totalConfirmed;
            this.newDeaths = data.newDeaths;
            this.totalDeaths = data.totalDeaths;
            this.newRecovered = data.newRecovered;
            this.totalRecovered = data.totalRecovered;
            
            this.summaryChartOptions={
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Summary Report'
                },
                subtitle: {
                    text: 'Source: api.covid19api.com'
                },
                xAxis: {
                    categories: this.summary_countries,
                    type: 'Country',
                    tickmarkPlacement: 'on',
                    title: {
                       enabled: true
                    }
                },
                tooltip: {
                    split: true
                },
                exporting: {
                  enabled: true
                }, 
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: 'New Confirmed',
                    data: this.newConfirmed
                }, {
                    name: 'Total Confirmed',
                    data: this.totalConfirmed
                }, {
                    name: 'New Deaths',
                    data: this.newDeaths
                }, {
                    name: 'Total Deaths',
                    data: this.totalDeaths
                }, {
                    name: 'New Recovered',
                    data: this.newRecovered
                }, {
                    name: 'Total Recovered',
                    data: this.totalRecovered
                }]
            }

        },
        err => {
          //this.content = JSON.parse(err.error).message;
        }
      );

    this.dashboardService.getAllCaseFromDayOneTotalGraphDataByCountry(this.defaultCountry).subscribe(
        data => {
            this.categories = data.categories;
            this.confirmed = data.confirmed;
            this.deaths = data.deaths;
            this.recovered = data.recovered;
            this.active = data.active;

            this.dayOneTotalChartOptions={
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Day One Total '
                },
                subtitle: {
                    text: 'Source: api.covid19api.com'
                },
              
                xAxis: {
                    categories: this.categories,
                    type: 'date',
                    tickmarkPlacement: 'on',
                    title: {
                       enabled: true
                    }
                },
                tooltip: {
                    split: true
                },
                exporting: {
                  enabled: true
                }, 
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: 'Confirmed',
                    data: this.confirmed
                }, {
                    name: 'Deaths',
                    data: this.deaths
                }, {
                    name: 'Recovered',
                    data: this.recovered
                }, {
                    name: 'Active',
                    data: this.active
                }]
            }

        },
        err => {
          //this.content = JSON.parse(err.error).message;
        }
      );

    
  
  setTimeout(()=>{
    window.dispatchEvent(
      new Event('resize')
    )
  },3000);

  HC_exporting(Highcharts);

  }

  onOptionsSelected(value:string){
    console.log("the selected value is " + value);

    this.dashboardService.getAllCaseFromDayOneTotalGraphDataByCountry(value).subscribe(
        data => {
            this.categories = data.categories;
            this.confirmed = data.confirmed;
            this.deaths = data.deaths;
            this.recovered = data.recovered;
            this.active = data.active;

            this.dayOneTotalChartOptions={
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Day One Total '
                },
                subtitle: {
                    text: 'Source: api.covid19api.com'
                },
                xAxis: {
                    categories: this.categories,
                    type: 'date',
                    tickmarkPlacement: 'on',
                    title: {
                       enabled: true
                    }
                },
                // yAxis: {
                   
                //     labels: {
                //         formatter: function () {
                //             return this.value / 1000;
                //         }
                //     }
                // },
                tooltip: {
                    split: true//,
                    //valueSuffix: ' millions'
                },
                exporting: {
                  enabled: true
                }, 
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: 'Confirmed',
                    data: this.confirmed
                }, {
                    name: 'Deaths',
                    data: this.deaths
                }, {
                    name: 'Recovered',
                    data: this.recovered
                }, {
                    name: 'Active',
                    data: this.active
                }]
            }

        },
        err => {
          //this.content = JSON.parse(err.error).message;
        }
      );

    
  
  setTimeout(()=>{
    window.dispatchEvent(
      new Event('resize')
    )
  },3000);

  HC_exporting(Highcharts);
 }

}
