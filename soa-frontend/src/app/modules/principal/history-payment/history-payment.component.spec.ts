import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPaymentComponent } from './history-payment.component';

describe('HistoryPaymentComponent', () => {
  let component: HistoryPaymentComponent;
  let fixture: ComponentFixture<HistoryPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryPaymentComponent]
    });
    fixture = TestBed.createComponent(HistoryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
