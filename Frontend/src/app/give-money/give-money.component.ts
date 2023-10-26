import { Component, OnInit } from '@angular/core';
import { FinancialSchoolBackendAccessService } from '../services/financial-school-backend-access.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-give-money',
  templateUrl: './give-money.component.html',
  styleUrls: ['./give-money.component.css', '../components/home/landing-page/landing-page.component.css',
    '../components/generalStyling.css']
})
export class GiveMoneyComponent implements OnInit {

  isMobileView: boolean = this.isMobile();

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  classesGrade = [
    { gradeId: 'a', viewGrade: 'א' },
    { gradeId: 'b', viewGrade: 'ב' },
    { gradeId: 'c', viewGrade: 'ג' },
    { gradeId: 'd', viewGrade: 'ד' },
    { gradeId: 'e', viewGrade: 'ה' },
    { gradeId: 'f', viewGrade: 'ו' },
  ];
  classesMap: { [gradeId: string]: string } = {
    a: 'א',
    b: 'ב',
    c: 'ג',
    d: 'ד',
    e: 'ה',
    f: 'ו',
  };
  numbers = [1, 2, 3, 4, 5];

  constructor(private backend: FinancialSchoolBackendAccessService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  formData: {
    name: string;
    grade: string;
    classNumber: string;
    amount: number;
    reason: string;
  } = { name: '', grade: '', classNumber: '', reason: '', amount: 0 };

  onClassSubmit() {
    this.sendMoney(
      this.formData.grade + this.formData.classNumber,
      this.formData.amount,
      this.formData.name + ' - ' + this.formData.reason);
  }

  onClassesSubmit() {
    if (this.formData.grade) {
      this.numbers.forEach(number => this.sendMoney(
        this.formData.grade + number,
        this.formData.amount,
        "הפקדה שכבתית מ" + this.formData.name + ' - ' + this.formData.reason))
    }
  }

  onSchoolSubmit() {
    this.classesGrade.forEach(grade => {
      this.numbers.forEach(number => this.sendMoney(
        grade.gradeId + number,
        this.formData.amount,
        "הפקדה בית ספרית מ" + this.formData.name + ' - ' + this.formData.reason))
    });
  }

  sendMoney(classId: string, amount: number, reason: string) {
    if (classId == '' || amount == 0 || reason == '') {
      return;
    }

    this.backend.updateClassCurrency(classId, amount, reason)
      .subscribe(() => {
        this.toastr.success("המאזן הכיתתי התעדכן בהצלחה")
      }, (err) => {
        console.log(err)
      });
  }

  schoolValidation() {
    return this.formData.name != '' && this.formData.amount != 0 && this.formData.reason != '';
  }

  classesValidation() :boolean {
    return this.schoolValidation() && this.formData.grade != '';
  }

  classValidation():boolean {
    return this.classesValidation() && this.formData.classNumber != '';
  }
}
