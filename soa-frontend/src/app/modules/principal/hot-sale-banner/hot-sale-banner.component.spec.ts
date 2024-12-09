import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotSaleBannerComponent } from './hot-sale-banner.component';

describe('HotSaleBannerComponent', () => {
  let component: HotSaleBannerComponent;
  let fixture: ComponentFixture<HotSaleBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotSaleBannerComponent]
    });
    fixture = TestBed.createComponent(HotSaleBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
