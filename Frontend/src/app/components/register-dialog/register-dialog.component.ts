import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Class, User } from 'src/entities.model';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css', '../generalStyling.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,
    public financialService: FinancialSchoolBackendAccessService,
    private toastr: ToastrService, private auth: AuthService
  ) { }

  loginUserName = '';
  loginPassword = '';
  registerData: User = {
    class: '',
    displayName: '',
    password: '',
    type: 'teacher',
    userName: '',
  };
  registerCode!: string;
  classes = [
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
  class: Class = {
    displayName: '',
    id: '',
    teacherId: '',
    totalCash: 0,
    teacherDisplayName: '',
  };
  classLevel: string = '';
  classNumber = 0;
  AuthResult = false;
  existingEntities: any[] = [];

  ngOnInit(): void { 
    this.financialService.getRegistrationValidationValues().subscribe(res => {
      this.existingEntities = res;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onLogin() {
    this.auth.getAuth(this.loginUserName, this.loginPassword);
    this.dialogRef.close(this.AuthResult);
  }

  onRegister() {
    if (this.registerCode != 'keshet') {
      this.toastr.error("קוד רישום לא נכון");
      return
    }
    this.registerData.class = this.classLevel + this.classNumber;
    this.class.id = this.classLevel + this.classNumber;
    this.class.teacherId = this.registerData.userName;
    this.class.displayName = this.classesMap[this.classLevel] + "'" + this.classNumber;
    this.financialService.insertNewClass(this.class).subscribe(res => {
      this.financialService.insertNewUser(this.registerData).subscribe(res => {
        this.toastr.success("המורה נרשם בהצלחה");
        this.auth.getAuth(this.registerData.userName, this.registerData.password);
        this.dialogRef.close(this.AuthResult);
        window.location.reload();
      }, () => this.toastr.warning("לא ניתן להוסיף את הכיתה הרצויה"));
    }, () => this.toastr.warning("לא ניתן להוסיף את המורה"));

  }
}
