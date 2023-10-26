import { Component, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralDepositPopupComponent } from 'src/app/components/general-deposit-popup/general-deposit-popup.component';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css', '../../../../generalStyling.css']
})
export class AddProductDialogComponent implements OnInit {

  update = {
    amount: 0, title: ""
  };
  popupTitle!: string;
  popupIconPath!: string;

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {}) { }

  ngOnInit(): void {

  }

  onSaveClick(): void {
    this.dialogRef.close({ update: this.update });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
