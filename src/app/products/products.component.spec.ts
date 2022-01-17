import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ProductsComponent} from "./products.component";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";
import {of} from "rxjs";
import {delay} from "rxjs/operators";
import {MatDialogModule} from "@angular/material/dialog";

describe("ProductsComponent", () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let product: Product;
  let service: ProductService;
  let TRes: {
    hits: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientTestingModule, MatDialogModule
      ],
      providers: [ProductService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    service = TestBed.get(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should call getProducts and return []", fakeAsync(() => {
  //   spyOn(service, "getProducts").and.returnValue(of([]).pipe(delay(1)));
  //   component.getProducts();
  //   expect(component.loading).toBeTruthy();
  //   tick(300);
  //   expect(component.loading).toBeFalsy();
  // }));
});
