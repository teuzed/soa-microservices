import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly apiUrl = 'http://localhost:8082/api/v1/order'; 

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  private buildUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.buildUrl('findAll'), { headers: this.getHeaders() });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(this.buildUrl(`find/${id}`), { headers: this.getHeaders() });
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.buildUrl('save'), order, { headers: this.getHeaders() });
  }

  updateOrder(id: number, order: any): Observable<any> {
    return this.http.put<any>(this.buildUrl(`update/${id}`), order, { headers: this.getHeaders() });
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(this.buildUrl(`delete/${id}`), { headers: this.getHeaders() });
  }
}