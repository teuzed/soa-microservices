// register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerModel: RegisterModel = { username: '', name:'' , password: '', email: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.registerModel).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); 
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.errorMessage = 'Registration failed. Please try again later.';
      }
    });
  }
}