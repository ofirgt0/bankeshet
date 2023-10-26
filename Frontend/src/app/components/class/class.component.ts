import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import {
  ChartManagerService,
  DatePart,
} from 'src/app/services/chart-manager.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Class, User, History } from 'src/entities.model';
import {
  Chart,
  ChartConfiguration,
  registerables,
  DoughnutController,
} from 'chart.js';
import { ChartTypeRegistry } from 'chart.js/auto';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
} from '@angular/material/bottom-sheet';
import { ClassCurrencyUpdateBottomSheetComponent } from './class-currency-update-bottom-sheet/class-currency-update-bottom-sheet.component';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { GeneralDepositPopupComponent, Type } from '../general-deposit-popup/general-deposit-popup.component';
import { ToastrService } from 'ngx-toastr';

const negativeColor = '#FF6B6B';
const positiveColor = '#3CB371';

const color = [
  '#395756',
  '#3D0814',
  '#49BEAA',
  '#9A9B73',
  '#F7C1BB',
  '#6969B3',
  '#235789',
  '#FF8966',
  '#E5446D',
  '#04471C',
  '#FFA69E',
  '#3083DC',
];
Chart.register(DoughnutController);
type chartParams = { data: any; labels: any };
export interface ChartData {
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css', '../generalStyling.css'],
})
export class ClassComponent implements OnInit {

  @ViewChild('scrollToTop') scrollToTop!: ElementRef;

  chosenClass!: Class;
  months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  currentMonth = this.months[new Date().getMonth()];

  myChart: any;
  chart: Chart | undefined;
  doughnutChart!: Chart<keyof ChartTypeRegistry, (number | null)[]>;
  myChart1: any;

  classCurrencyHistory: History[] = [];
  classCurrencyHistory$: Observable<History[]> = of([]);
  classCurrencyData: number[][] = [];
  classId!: string;
  teacherData!: User;

  chartData: number[] = [];
  chartLabels: string[] = [];

  yearlyIncome: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  yearlyOutcome: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  isLoggedIn$!: BehaviorSubject<boolean>;
  doughnutYearlyIncome!: number;
  doughnutYearlyOutcome!: number;
  barTotalYearlyIncome: number = 0;
  barTotalYearlyOutcome: number = 0;

  counter = 0;

  constructor(
    private backend: FinancialSchoolBackendAccessService,
    private route: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private chartService: ChartManagerService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
  }

  async ngOnInit(): Promise<void> {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.isLoggedIn$ = this.authService.loggedInBehaviorSubject;

    Chart.register(...registerables);
    this.classId = this.route.snapshot.paramMap.get('classId') + '';
    this.chartService.setClassCurrencyData(this.classId);

    this.backend.getClassById(this.classId).subscribe((classData) => {
      this.chosenClass = classData;

      this.backend.getUser(this.chosenClass.teacherId).subscribe((teacher) => {
        this.teacherData = teacher;
        this.classCurrencyData = this.chartService.historyData;

        this.classCurrencyHistory$ = this.backend
          .getHistoryByClassId(this.classId)
          .pipe(filter((classHistory) => classHistory != null));

        this.classCurrencyHistory$.subscribe((classHistory) => {
          console.log(classHistory);
          this.classCurrencyHistory = classHistory.sort(this.compare);
          console.log(this.classCurrencyHistory);

          this.chartObjectHandler();
          this.setBarChart();

          this.barTotalYearlyOutcome = this.yearlyOutcome.reduce((acc, currentValue) => acc + currentValue, 0);
          this.barTotalYearlyIncome = this.yearlyIncome.reduce((acc, currentValue) => acc + currentValue, 0);
          this.doughnutYearlyIncome = this.yearlyIncome[new Date().getMonth()];
          this.doughnutYearlyOutcome = this.yearlyOutcome[new Date().getMonth()];

          console.log(this.yearlyIncome);

          this.setDoughnutChart();
        });
      });
      this.startCounter()
    });
  }

  public startCounter() {
    const intervalId = setInterval(() => {
      if (this.counter >= this.chosenClass?.totalCash) {
        clearInterval(intervalId);
      } else {
        this.counter++;
      }
    }, 2);
  }

  setDoughnutChart() {
    const config: ChartConfiguration<'doughnut', number[], string> = {
      type: 'doughnut',
      data: {
        // labels: ['הוצאות', 'הכנסות'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [
              this.doughnutYearlyOutcome,
              this.doughnutYearlyIncome,
            ],
            backgroundColor: [negativeColor, positiveColor],
          },
        ],
      },
      options: {
        cutout: '60%',
        animation: {
          animateRotate: true,
          animateScale: true,
        },
      },
    };

    const chart = new Chart('doughnutChart', config);
  }

  setBarChart() {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx)
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'הכנסות',
              data: this.yearlyIncome,
              backgroundColor: positiveColor,
              borderColor: positiveColor,
              borderWidth: 1,
            },
            {
              label: 'הוצאות',
              data: this.yearlyOutcome,
              backgroundColor: negativeColor,
              borderColor: negativeColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false, // Remove the legend (controller)
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }

  setChartDataByHistoryLines() {
    var chartData: ChartData;

    if (this.chosenClass) {
      var lastCurrency = this.chosenClass.totalCash;

      this.chartData.unshift(lastCurrency);
      this.chartLabels.unshift('עכשיו');

      this.classCurrencyHistory.forEach((classCurrencyHistoryLine) => {
        this.chartData.unshift(
          lastCurrency - classCurrencyHistoryLine.transactionPrice
        );
        lastCurrency = lastCurrency - classCurrencyHistoryLine.transactionPrice;
        this.chartLabels.unshift(this.dateTransform(classCurrencyHistoryLine.date));

        var month = this.getDatePartNumberByDateString(
          classCurrencyHistoryLine.date,
          DatePart.month
        );
        console.log("month");
        console.log(month);

        classCurrencyHistoryLine.transactionPrice > 0
          ? (this.yearlyIncome[month - 1] +=
            classCurrencyHistoryLine.transactionPrice)
          : (this.yearlyOutcome[month - 1] -=
            classCurrencyHistoryLine.transactionPrice);
      });
    }
  }

  chartObjectHandler() {
    this.setChartDataByHistoryLines();
    this.myChart = new Chart(this.chosenClass?.id, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: this.chosenClass?.displayName,
            data: this.chartData,
            fill: 'start',
            borderColor: 'rgba(219, 182, 93)',
            backgroundColor: (context) => {
              const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(219, 182, 93, 1)');
              gradient.addColorStop(0, 'rgba(219, 182, 93, 0.3)');
              gradient.addColorStop(0, 'rgba(219, 182, 93, 0.1)');
              gradient.addColorStop(1, 'rgba(219, 182, 93, 0)');
              return gradient;
            },
            tension: 0.1,
            pointRadius: 7,
            order: 1,
            pointBackgroundColor: 'rgba(219, 182, 93, 1)'
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Remove the legend (controller)
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }

  getYearlyView(option: 'positive' | 'negative' | 'all'): ChartData {
    var year: number[] = [];
    for (let month = 11; month >= 0; month--) {
      year[month] = this.sumNumbers(this.classCurrencyData[month], option);
    }
    return { labels: this.months, data: year };
  }

  getMonthlyHistory(month: number) {
    var classMonthlyCurrencyHistory = this.classCurrencyHistory;
    classMonthlyCurrencyHistory.filter(
      (historyLine) =>
        this.chartService.getDatePartNumberByDateString(
          historyLine.date,
          DatePart.month
        ) === month
    );
    return classMonthlyCurrencyHistory;
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

  compare(a: History, b: History) {
    const [Aday, Amonth, Ayear, Ahour, Aminute, Asecond] =
      a.date.split(/\/|\s|:/);
    const [Bday, Bmonth, Byear, Bhour, Bminute, Bsecond] =
      b.date.split(/\/|\s|:/);

    const dateA = new Date(
      Number(Ayear),
      Number(Amonth) - 1,
      Number(Aday),
      Number(Ahour),
      Number(Aminute),
      Number(Asecond)
    );
    const dateB = new Date(
      Number(Byear),
      Number(Bmonth) - 1,
      Number(Bday),
      Number(Bhour),
      Number(Bminute),
      Number(Bsecond)
    );

    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }

  getDatePartNumberByDateString(date: string, part: DatePart) {
    return Number(date.split('/')[part]);
  }

  openDialog(popupType: Type) {
    const dialogRef = this.dialog.open(GeneralDepositPopupComponent, {
      width: '40%',
      panelClass: 'custom-dialog',
      data: {
        popupType: popupType,
        currency: this.chosenClass.totalCash
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.update.amount != 0) {
        if (result.update.type != Type.Deposit)
          result.update.amount = result.update.amount * -1;

        this.backend.updateClassCurrency(this.chosenClass.id, result.update.amount, result.update.reason)
          .subscribe(() => {
            this.toastr.success("המאזן הכיתתי התעדכן בהצלחה")
          });
        setTimeout(function () {
          location.reload();

        }, 1000);
      }
    });
  }

  _deleteLastHistoryLine() {
    this.backend.deleteHistoryLine(this.classCurrencyHistory[0].id).subscribe(() => {
      window.location.reload();
    })
  }

  dateTransform(inputDateTime: string): string {
    const [datePart, timePart] = inputDateTime.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');

    // Construct a Date object using the components
    const inputDate = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);

    // Get the current date
    const currentDate = new Date();

    // Check if the input date is today
    if (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Format the time (HH:MM)
      const formattedHours = String(inputDate.getHours()).padStart(2, '0');
      const formattedMinutes = String(inputDate.getMinutes()).padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}`;
    } else {
      // Format the date (DD/mm)
      const formattedDay = String(inputDate.getDate()).padStart(2, '0');
      const formattedMonth = String(inputDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
      return `${formattedDay}/${formattedMonth}`;
    }
  }
}
