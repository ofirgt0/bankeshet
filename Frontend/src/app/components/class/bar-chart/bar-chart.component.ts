import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { ChartManagerService } from 'src/app/services/chart-manager.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Class } from 'src/entities.model';

const months = ['ינואר',  'פברואר',  'מרץ',  'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

export interface ChartData {
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  chart: Chart | undefined;
  chosenClass!: Class;

  constructor(
    private backend: FinancialSchoolBackendAccessService,
    private route: ActivatedRoute,
    private chartService: ChartManagerService
  ) {}

  ngOnInit(): void {
    var classId = this.route.snapshot.paramMap.get('classId') + '';
    this.backend.getClassById(classId).subscribe((classData) => {
      this.chosenClass = classData;
    })
  }

  setBarChart() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx)
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'הכנסות',
              data: this.getYearlyView('positive').data,
              backgroundColor: 'rgba(110, 202, 131, 0.5)',
              borderColor: 'rgba(97, 169, 114, 1)',
              borderWidth: 1,
            },
            {
              label: 'הוצאות',
              data: this.getYearlyView('negative').data,
              backgroundColor: 'rgba(199, 29, 29, 0.5)',
              borderColor: 'rgba(137, 19, 19, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    
    getYearlyView(option: 'positive' | 'negative' | 'all'): ChartData {
      var year: number[] = [];
      //var lastValue = this.chosenClass.totalCash;
      for (let month = 11; month >= 0; month--) {
        year[month] = this.sumNumbers(this.chartService.historyData[month], option);
      }
      return { labels: months, data: year };
    }

    sumNumbers(
      numbers: number[],
      option: 'positive' | 'negative' | 'all'
    ): number {
      let sum = 0;
  
      for (let i = 0; i < numbers.length; i++) {
        if (option === 'positive' && numbers[i] > 0) {
          sum += numbers[i];
        } else if (option === 'negative' && numbers[i] < 0) {
          sum -= numbers[i];
        } else if (option === 'all') {
          sum += numbers[i];
        }
      }
  
      return sum;
    }
}
