// src/app/modules/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';  // Importamos RegisterComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },    // Ruta para el login
  { path: 'register', component: RegisterComponent },  // Ruta para el registro
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
