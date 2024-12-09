import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosAdmComponent } from './productos-adm.component';

const routes: Routes = [{ path: '', component: ProductosAdmComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosAdmRoutingModule { }
