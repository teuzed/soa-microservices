import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosAdmComponent } from './productos-adm.component';

describe('ProductosAdmComponent', () => {
  let component: ProductosAdmComponent;
  let fixture: ComponentFixture<ProductosAdmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosAdmComponent]
    });
    fixture = TestBed.createComponent(ProductosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
