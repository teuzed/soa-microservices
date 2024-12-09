// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from '../../../common/core/state/auth/auth.actions';
import { AuthFirebaseService } from 'src/app/services/auth/auth-firebase.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginModel: LoginModel = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService,
    private router: Router,
    private authGoogleService: AuthFirebaseService,
    private store: Store
  ) {

  }

  login() {
    this.authService.login(this.loginModel).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.store.dispatch(AuthActions.loginSuccess({ user: response }));

        this.router.navigate(['/principal/productos']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  signInWithGoogle() {
    this.authGoogleService.googleAuth().then(() => {
      this.router.navigate(['/principal/productos']).then(() => {
        window.location.reload();
      });
    }).catch((error) => {
      console.error('Error al iniciar sesión con Google:', error);
    });
  }
}
