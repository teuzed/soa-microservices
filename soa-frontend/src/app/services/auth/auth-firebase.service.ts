import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {

  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userData = result.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('isLogin', JSON.stringify(true)); 
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.userData = result.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        localStorage.setItem('isLogin', JSON.stringify(true)); 
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user !== null && user.uid ? true : false; // Verificar si existe y tiene UID
  }

  googleAuth() {
    return this.authLogin(new GoogleAuthProvider());
  }

  facebookAuth() {
    return this.authLogin(new FacebookAuthProvider());
  }

  async authLogin(provider: any) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.userData = result.user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      localStorage.setItem('isLogin', JSON.stringify(true));  
      this.router.navigate(['/home']);
    } catch (error) {
      window.alert(error);
    }
  }
 
  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    localStorage.setItem('isLogin', JSON.stringify(false));  
    this.router.navigate(['/']);
  }
}
