import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private readonly apiUrl = 'http://localhost:8084/api/v1/order-detail'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private buildUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  saveOrderDetail(orderDetail: any): Observable<any> {
    return this.http.post<any>(this.buildUrl('save'), orderDetail, { headers: this.getHeaders() });
  }

  getOrderDetails(): Observable<any> {
    return this.http.get<any>(this.buildUrl('findAll'), { headers: this.getHeaders() });
  }

  getOrderDetailById(id: number): Observable<any> {
    return this.http.get<any>(this.buildUrl(`find/${id}`), { headers: this.getHeaders() });
  }

  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(this.buildUrl(`delete/${id}`), { headers: this.getHeaders() });
  }
}