import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductParamsComponent } from './product-params.component';

describe('ProductParamsComponent', () => {
  let component: ProductParamsComponent;
  let fixture: ComponentFixture<ProductParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductParamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
