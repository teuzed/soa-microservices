// src/app/services/productos-admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosAdminService {
  private baseUrl = 'http://localhost:8081/api/v1/product'; // Cambiar si la URL base del backend es distinta

  constructor(private http: HttpClient) {}

  // Crear un nuevo producto
  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/save`, producto);
  }

  // Obtener un producto por ID
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/find/${id}`);
  }

  // Listar todos los productos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/findAll`);
  }

  // Eliminar un producto por ID
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  actualizarProducto(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/update/${id}`, producto);
  }

  // Endpoint de ejemplo (opcional)
  ejemplo(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/example`);
  }

  guardarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/save`, producto);
  }
}
