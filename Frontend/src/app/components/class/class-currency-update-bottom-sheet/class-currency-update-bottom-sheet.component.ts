import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FinancialSchoolBackendAccessService } from 'src/app/services/financial-school-backend-access.service';
import { Product } from 'src/entities.model';

@Component({
  selector: 'app-class-currency-update-bottom-sheet',
  templateUrl: './class-currency-update-bottom-sheet.component.html',
  styleUrls: ['./class-currency-update-bottom-sheet.component.css', 
  '../../home/landing-page/products/products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClassCurrencyUpdateBottomSheetComponent implements OnInit {

  product: Product = {
    description: '',
    id: 0,
    price: 0,
    title: '',
  };
  
  constructor(private _bottomSheetRef: MatBottomSheetRef<ClassCurrencyUpdateBottomSheetComponent>,
      private backend: FinancialSchoolBackendAccessService,
      private authService: AuthService,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  onNewProduct() {
    this.backend.updateClassCurrency(localStorage.getItem('TeachersClass')!,this.product.price, this.product.title)
    .subscribe(() => this.toastr.success("הכסף התווסף בהצלחה"));
    setTimeout(function() {
      location.reload();
    }, 1000);
  }
}