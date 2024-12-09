import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { HotSaleBannerComponent } from './modules/principal/hot-sale-banner/hot-sale-banner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent implements OnInit{
  title = 'p-soa-2';


  ngOnInit(): void {
    initFlowbite();
  }
}
