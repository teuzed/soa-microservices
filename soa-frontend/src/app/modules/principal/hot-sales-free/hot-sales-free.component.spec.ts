import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotSalesFreeComponent } from './hot-sales-free.component';

describe('HotSalesFreeComponent', () => {
  let component: HotSalesFreeComponent;
  let fixture: ComponentFixture<HotSalesFreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotSalesFreeComponent]
    });
    fixture = TestBed.createComponent(HotSalesFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
