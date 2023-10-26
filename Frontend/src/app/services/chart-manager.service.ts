import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinancialSchoolBackendAccessService } from './financial-school-backend-access.service';
import { History } from 'src/entities.model';
import { ActivatedRoute } from '@angular/router';

export enum DatePart {
  day = 0,
  month = 1,
  year = 2,
}

@Injectable({
  providedIn: 'root',
})
export class ChartManagerService {
  historyData: number[][] = [];
  stockNameToShowSubscription: BehaviorSubject<string>;
  classId!: string;
  classCurrencyHistory: History[] = [];
  classCurrencyHistory$: BehaviorSubject<History[]> = new BehaviorSubject<History[]>([]);

  constructor(private backend: FinancialSchoolBackendAccessService,
    private route: ActivatedRoute) {
    this.stockNameToShowSubscription = new BehaviorSubject<string>('Apple');
    this.classId = this.route.snapshot.paramMap.get('classId') + '';
    this.backend.getHistoryByClassId(this.classId).subscribe((classHistory) => {
      this.classCurrencyHistory = classHistory.sort(this.compare);
      this.classCurrencyHistory$.next(classHistory.sort(this.compare))
    });
  }
  compare(a: History, b: History) {

    const [Aday, Amonth, Ayear, Ahour, Aminute, Asecond] = a.date.split(/\/|\s|:/);
    const [Bday, Bmonth, Byear, Bhour, Bminute, Bsecond] = b.date.split(/\/|\s|:/);

    const dateA = new Date(Number(Ayear), Number(Amonth) - 1, Number(Aday), Number(Ahour), Number(Aminute), Number(Asecond));
    const dateB = new Date(Number(Byear), Number(Bmonth) - 1, Number(Bday), Number(Bhour), Number(Bminute), Number(Bsecond));

    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
    return 0;
  }
  getHistory(){
    return this.classCurrencyHistory;
  }

  getStockNameValue(): Observable<string> {
    return this.stockNameToShowSubscription.asObservable();
  }
  setStockNameValue(newValue: string): void {
    this.stockNameToShowSubscription.next(newValue);
  }

  setClassCurrencyData(classId: string) {
    this.backend.getClassById(classId).subscribe((cls) => {
      this.backend.getHistoryByClassId(classId).subscribe((historyLines) => {
        this.historyData = Array(12)
          .fill(0)
          .map(() => Array(31).fill(0));
        historyLines.forEach((historyLine) => {
          var day = this.getDatePartNumberByDateString(
            historyLine.date,
            DatePart.day
          );
          var month = this.getDatePartNumberByDateString(
            historyLine.date,
            DatePart.month
          );
          this.historyData[Number(month) - 1][Number(day) - 1] +=
            historyLine.transactionPrice;
        });
      });
    });
  }

  getDaysInMonth(month: number): number {
    if (month < 1 || month > 12) {
      throw new Error('Invalid month number');
    }

    const isLeapYear = new Date().getFullYear() % 4 === 0;
    const daysInMonth = [
      31, // January
      isLeapYear ? 29 : 28, // February
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31, // December
    ];

    return daysInMonth[month - 1];
  }

  getDatePartNumberByDateString(date: string, part: DatePart) {
    return Number(date.split('/')[part]);
  }
}
