import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Class } from 'src/entities.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss', '../../../generalStyling.css'],
})
export class ClassesComponent implements OnInit {
  classes:{ [grade: string]: Class[] } = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
  };
  loggedClass:any;  
  constructor(private backend: FinancialSchoolBackendAccessService) {}

  ngOnInit(): void {
    this.backend.getClassById(localStorage.getItem('TeachersClass')!).subscribe((classRes) => {
      this.loggedClass = classRes;
    });
    this.backend.getClasses().subscribe((classes) => {
      let resJSON = JSON.parse(JSON.stringify(classes)).result;
      resJSON.forEach((cls: Class) => {
        this.classes[cls?.id.charAt(0)].push(cls);
      });
    });
  }
}
