import { Component, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insurance-dialog',
  templateUrl: './insurance-dialog.component.html',
  styleUrls: ['./insurance-dialog.component.css']
})
export class InsuranceDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InsuranceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { insuranceText: string, insuranceQuestion: string }) {}

  ngOnInit(): void {
  }

  onSaveClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}