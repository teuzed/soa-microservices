// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  {
    path: 'principal',
    loadChildren: () => import('./modules/principal/principal.module').then(m => m.PrincipalModule),
  },
  {
    path: 'admin/dashboard/login',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'auth',  // Asegúrate de que este módulo sea cargado cuando se acceda a rutas de autenticación
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: '/principal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
