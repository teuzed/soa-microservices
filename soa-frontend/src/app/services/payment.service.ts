import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8083/api/v1/payment';

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/save`, paymentData, { headers })
      .pipe(
        catchError(error => {
          console.error('Payment processing error:', error);
          return throwError(error);
        })
      );
  }
}