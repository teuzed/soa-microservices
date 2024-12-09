import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from './../../../services/payment.service';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailService } from 'src/app/services/order-detail.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class PaymentComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;
  paymentForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private orderDetailService:OrderDetailService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.cartItems = navigation?.extras.state?.['cartItems'] || [];
  }

  ngOnInit(): void {
    this.calculateTotalPrice();
    this.initializeForm();
  }

  initializeForm(): void {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiration: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  paymentProcess(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
  
    const formData = this.paymentForm.value;
  
    const userId =  JSON.parse(localStorage.getItem('user') || '{}').id;    ;  
  
    const orderData = {
      id_user: userId,
      date_order: new Date().toISOString().split('T')[0], 
      status: 'Pending', 
      total: this.totalPrice, 
    };
  
     
    this.orderService.createOrder(orderData).subscribe({
      next: (orderResponse) => {
        console.log('Orden creada correctamente:', orderResponse);
  
        this.saveOrderDetails(orderResponse.id);
  
        // Procesar el pago
        const paymentData = {
          id_order: orderResponse.id,  
          mount: this.totalPrice,
          status: 'Pending',
          date: new Date().toISOString().split('T')[0],
          method: 'Credit Card',
          card: formData.cardNumber,
        };
  
        this.paymentService.processPayment(paymentData).subscribe({
          next: (paymentResponse) => {
            console.log('Pago procesado correctamente:', paymentResponse);
            alert('Pago procesado con éxito');
            this.router.navigate(['/success'], { state: { amount: this.totalPrice } });
          },
          error: (paymentError) => {
            console.error('Error en el procesamiento del pago:', paymentError);
            alert('Hubo un error al procesar el pago. Intenta nuevamente.');
          }
        });
      },
      error: (orderError) => {
        console.error('Error al crear la orden:', orderError);
        alert('Hubo un error al crear la orden. Intenta nuevamente.');
      }
    });
  }
  
  saveOrderDetails(orderId: number): void {
    const orderDetails = this.cartItems.map(item => ({
      id_order: orderId,        
      id_product: item.id,     
      quantity: item.quantity,  // Cantidad
      price: item.price * item.quantity, // Precio total (unitario * cantidad)
      unite_price: item.price,  // Precio unitario
      sub_total: item.price * item.quantity // Subtotal
    }));
  
    // Llamada al servicio para guardar los detalles de la orden en el microservicio order_detail
    orderDetails.forEach(detail => {
      this.orderDetailService.saveOrderDetail(detail).subscribe({
        next: (response) => {
          console.log('Detalle de la orden guardado correctamente:', response);
        },
        error: (error) => {
          console.error('Error al guardar el detalle de la orden:', error);
        }
      });
    });
  }
  

}
