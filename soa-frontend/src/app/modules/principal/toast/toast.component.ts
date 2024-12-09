import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ToastComponent {

  message: string = '';
  show: boolean = false;

  constructor(public toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe(state => {
      this.message = state.message;
      this.show = state.show;
    });
  }

}
