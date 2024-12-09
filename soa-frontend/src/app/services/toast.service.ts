import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  private toastSubject = new BehaviorSubject<{ message: string, show: boolean }>({ message: '', show: false });
  toastState$ = this.toastSubject.asObservable();

  showToast(message: string) {
    this.toastSubject.next({ message, show: true });
    setTimeout(() => this.hideToast(), 3000);  
  }

  hideToast() {
    this.toastSubject.next({ message: '', show: false });
  }

}
