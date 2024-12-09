// src/app/modules/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';  // Importa el módulo de enrutamiento
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';  // Asegúrate de que la ruta sea correcta
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent  // Declara el componente login
  ],
  imports: [
    CommonModule,
    AuthRoutingModule ,// Agrega el AuthRoutingModule aquí
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule, // Asegúrate de agregar FormsModule aquí
    FormsModule,  // Importar para formularios basados en ngModel
    ReactiveFormsModule,
    MatGridListModule

  ]
})
export class AuthModule { }
