import { Component, OnInit, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GeneralDepositPopupComponent } from 'src/app/components/general-deposit-popup/general-deposit-popup.component';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Class, Product } from 'src/entities.model';
import { InsuranceDialogComponent } from '../insurance-dialog/insurance-dialog.component';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css', '../../../generalStyling.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private backend: FinancialSchoolBackendAccessService,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {

    this.isLoggedIn$ = this.authService.loggedInBehaviorSubject;
  }

  product: Product = {
    description: '',
    id: 0,
    price: 0,
    title: '',
  };

  products: Product[] = [];
  isLoggedIn$!: Observable<boolean>;
  teachersClass!: Class;

  ngOnInit(): void {
    this.backend.getClassById(localStorage.getItem('TeachersClass')!).subscribe((classRes) => {
      this.teachersClass = classRes;
    });

    this.backend.getProducts().subscribe((products) => {
      let resJSON = JSON.parse(JSON.stringify(products)).result;
      resJSON.forEach((product: Product) => this.products.push(product));
      this.products.sort((a, b) => a.price - b.price);
    });
  }

  onNewProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.update.title.length > 0) {
        this.product.price = result.update.amount;
        this.product.title = result.update.title;
        this.backend.insertProducts(this.product)
          .subscribe((res) => {
            this.toastr.success("המוצר התווסף בהצלחה");
            setTimeout(function () {
              location.reload();
            }, 700);
          }, err => {
            this.toastr.success("התרחשה שגיאה בעת נסיון הרכישה");
          });
      }
    });
  }

  onBuyProduct(product: Product) {
    const dialogRef = this.dialog.open(InsuranceDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog',
      data: {
        insuranceQuestion: "האם אתה בטוח שברצונך לרכוש את:",
        insuranceText: product.title + " במחיר של " + product.price + " קשף?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backend.buyProduct(this.authService.loginTeacher.class, product.id).subscribe((res) => {
          if (res) {
            this.toastr.success("הרכישה התבצעה בהצלחה");
            setTimeout(function () {
              location.reload();
            }, 700);
          }
          else {
            this.toastr.error("לצערנו אין מספיק כסף בחשבונך");
          }
        }, e => {
          this.toastr.success("התרחשה שגיאה בעת נסיון הרכישה");
        });
      }
    });
  }

  onRemoveProduct(product: Product) {
    const dialogRef = this.dialog.open(InsuranceDialogComponent, {
      width: '600px',
      panelClass: 'custom-dialog',
      data: {
        insuranceQuestion: "האם אתה בטוח שברצונך למחוק את:",
        insuranceText: product.title + " במחיר של " + product.price + " קשף?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backend.deleteProduct(product.id + "").subscribe((res) => {
          if (res) {
            this.toastr.success("הפריט הוסר בהצלחה");
            setTimeout(function () {
              location.reload();
            }, 700);
          }
        }, e => {
          this.toastr.success("התרחשה שגיאה בעת נסיון ההסרה");
        });
      }
    });
  }

}
