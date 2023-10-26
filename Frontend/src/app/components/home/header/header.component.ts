import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { RegisterDialogComponent } from '../../register-dialog/register-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../generalStyling.css']
})
export class HeaderComponent implements OnInit {

  loggedInUserDisplayName!: string | null;
  loggedInUserId!: string | null;
  isLoggedIn$!: BehaviorSubject<boolean>;

  constructor(private toastr: ToastrService, 
              private authService: AuthService,
              public dialog: MatDialog, 
              private backend: FinancialSchoolBackendAccessService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.loggedInBehaviorSubject;
    this.authService.loggedInBehaviorSubject.subscribe(isLoggedIn => {
      if(isLoggedIn)
      {
        this.loggedInUserDisplayName = this.authService.loginTeacher?.displayName;
        this.loggedInUserId = this.authService.loginTeacher.userName;
      }
    });
  }

  isTeacherLoggedin(){
    return this.loggedInUserDisplayName != null && this.loggedInUserDisplayName != "";
  }

  onLogout()
  {
    localStorage.setItem('TeacherId','')
    localStorage.setItem('TeacherPassword','')
    window.location.reload()
    this.toastr.success("התנתקת בהצלחה")
  }
  
  onTeacherLogin() {
    this.dialog.open(RegisterDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog'
    });
  }

}
