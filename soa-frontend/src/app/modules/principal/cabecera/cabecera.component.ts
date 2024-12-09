import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthFirebaseService } from 'src/app/services/auth/auth-firebase.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  username: string = 'Iniciar sesión';

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private authGoogle: AuthFirebaseService
  ) {}

  ngOnInit(): void {
    this.updateUsernameFromLocalStorage();
  }
  updateUsernameFromLocalStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      if (userObj) {
        this.username = userObj.username || userObj.displayName || 'Iniciar sesión';
      }
    } else {
      this.username = 'Iniciar sesión';
    }
  }

  logout(): void {
    this.authService.logout();
    this.authGoogle.signOut();
    this.updateUsernameFromLocalStorage();
    this.router.navigate(['/']);
  }
}
