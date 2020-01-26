import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
//import {html2canvas} from 'html2canvas/dist/html2canvas.min.js'
//import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas'
import Chart from 'chart.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.getChart(); console.log('Post construct')
  }
  title = 'MyApp';

  @ViewChild('capture') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  @ViewChild('myChart') myChart: ElementRef;

  constructor() {



  }
  dataPack1 = [5,3,5,3 ];
  dataPack2 = [3,10,0 ,6];
  dataPack3 = [3,10,0 ,6];
  dates = [8,13,5,9];

  test() {
    console.log("hi " + this.screen.nativeElement)
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });
  }


  test1() {
    html2canvas(this.screen.nativeElement).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = "image.jpg";
        link.href = URL.createObjectURL(blob);
        link.click();



      }, 'image/jpg');
    });



  }


  getChart() {
    console.log('get Chart')
    var numberWithCommas = function (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    var bar_ctx = this.myChart.nativeElement   //  
    console.log('get Chart 1 : ', bar_ctx)
    //bar_ctx = document.getElementById('bar-chart') 
    console.log('get Chart 2: ', bar_ctx)
    var bar_chart = new Chart(bar_ctx, {
      type: 'horizontalBar',
      

      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'Bowser',
            data: this.dataPack1,
            backgroundColor: "rgba(55, 160, 225, 0.7)",
            hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: 'lightgrey'
          },
          {
            label: 'Mario',
            data: this.dataPack2,
            backgroundColor: "rgba(225, 58, 55, 0.7)",
            hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
            hoverBorderWidth: 2,
            hoverBorderColor: 'lightgrey'
          },{
            label: 'Mario1',
            data: this.dataPack3,
            backgroundColor: "blue",
            hoverBackgroundColor: "blue",
            hoverBorderWidth: 2,
            hoverBorderColor: 'lightgrey'
          }
        ]
      },
      options: {
        maintainAspectRatio:false,
        responsive:true,
        "hover": {
          "animationDuration": 0
        },
        animation: {
          "duration": 1,
          "onComplete": function() {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;
    
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
    
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              let count =0
              meta.data.forEach(function(bar, index) {
                var data = dataset.data[index];
                count+=data
                ctx.fillText(data, bar._model.x-10, bar._model.y + 5);
                if(meta.data.length-1==index){

                  ctx.fillText(count, bar._model.x, bar._model.y ); 
                }
                console.log(' length ',meta.data.length,' index ',index)
              });

            });
          }
        
      },
        // tooltips: {

        //   mode: 'label',
        //   callbacks: {
        //     label: function (tooltipItem, data) {
        //       return data.datasets[tooltipItem.datasetIndex].label + ": " + numberWithCommas(tooltipItem.yLabel);
        //     }
        //   }
        // },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: { display: false },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              callback: function (value) { return numberWithCommas(value); },
            },
          }],
        }, // scales
        legend: { display: true }
      } // options
    }
    );
  }

 
}
