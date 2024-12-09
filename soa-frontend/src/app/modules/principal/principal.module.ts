// src/app/modules/principal/principal.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PaymentComponent } from './payment/payment.component';
import { HotSaleBannerComponent } from './hot-sale-banner/hot-sale-banner.component';
import { HotSalesFreeComponent } from './hot-sales-free/hot-sales-free.component';
import { HistoryPaymentComponent } from './history-payment/history-payment.component';


@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    NosotrosComponent,
    HistoryPaymentComponent,

  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
  ],
})
export class PrincipalModule {}
