import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosAdmComponent } from './productos-adm/productos-adm.component';

const routes: Routes = [
  { path: '', component: ProductosAdmComponent },  // Ruta para el dashboard
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
