import { Component, OnInit } from '@angular/core';
import { stock } from 'src/entities.model';
import { Chart, registerables } from 'chart.js';
import { ChartManagerService } from 'src/app/services/chart-manager.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAuth = false;
  stocks: stock[] = [];
  mySubscription: any;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private chartService: ChartManagerService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    // (await this.dataContainerService.getStocksAsync()).subscribe( resStocks => { this.stocks = resStocks });
    // setInterval(async () => {
    //   (await this.dataContainerService.getStocksAsync()).subscribe(resStocks=>{this.stocks=resStocks});
    // }, 1000);

    
    Chart.register(...registerables);
  }

  showChart(stockName: string) {
    this.chartService.setStockNameValue(stockName);
  }
}
