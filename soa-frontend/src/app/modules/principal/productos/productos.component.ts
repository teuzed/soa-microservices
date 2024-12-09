import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'; // Ajustar ruta si es necesario
import { CarService } from 'src/app/services/car.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  products: any[] = []; // Almacena la lista de productos obtenidos del backend
  isLoading: boolean = true;
  hasError: boolean = false;
  addCar: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CarService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    // Llama al servicio para obtener los productos al iniciar el componente
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data; // Asigna los productos al array
        this.isLoading = false; // Finaliza la carga
      },
      (error) => {
        console.error('Error al cargar los productos', error);
        this.hasError = true; // Indica que hubo un error
        this.isLoading = false; // Finaliza la carga
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.addCar = true;
    alert('Producto añadido al carrito');
    this.addCar = false;
  }
}