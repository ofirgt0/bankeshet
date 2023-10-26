import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RoundBigNumbersPipe } from './Pipes/RoundBigNumbers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { DateAsAgoPipe } from './Pipes/dateAsAgo';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { ClassesComponent } from './components/home/landing-page/classes/classes.component';
import { LandingPageComponent } from './components/home/landing-page/landing-page.component';
import { ProductsComponent } from './components/home/landing-page/products/products.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { ClassComponent } from './components/class/class.component';
import { ClassCurrencyUpdateBottomSheetComponent } from './components/class/class-currency-update-bottom-sheet/class-currency-update-bottom-sheet.component';
import { BarChartComponent } from './components/class/bar-chart/bar-chart.component';
import { ForeignExchangeComponent } from './components/home/landing-page/foreign-exchange/foreign-exchange.component';
import { FooterComponent } from './components/home/landing-page/footer/footer.component';
import { HeaderComponent } from './components/home/header/header.component';
import { GeneralDepositPopupComponent } from './components/general-deposit-popup/general-deposit-popup.component';
import { InsuranceDialogComponent } from './components/home/landing-page/insurance-dialog/insurance-dialog.component';
import { AddProductDialogComponent } from './components/home/landing-page/products/add-product-dialog/add-product-dialog.component';
import { GiveMoneyComponent } from './give-money/give-money.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'class/:classId', component: ClassComponent },
  { path: 'giveMoney', component: GiveMoneyComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RoundBigNumbersPipe,
    DateAsAgoPipe,
    HomeComponent,
    RegisterDialogComponent,
    ClassesComponent,
    LandingPageComponent,
    ProductsComponent,
    ClassComponent,
    GiveMoneyComponent,
    ClassCurrencyUpdateBottomSheetComponent,
    BarChartComponent,
    ForeignExchangeComponent,
    FooterComponent,
    HeaderComponent,
    GeneralDepositPopupComponent,
    InsuranceDialogComponent,
    AddProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSliderModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatBottomSheetModule,
    MatTabsModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
