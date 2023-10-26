import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isMobileView: boolean = this.isMobile();

  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.ngOnInit();
  }
  
  isMobile(): boolean {
    return window.innerWidth < 768; // You can adjust the threshold (e.g., 768px) based on your design.
  }
  
}
