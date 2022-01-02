import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(size: number, from: number, includes: string, keywords: string) {
    return this.http.get(
      `api/products/v1.0/?size=${size}&from=${from}&includes=${includes}&keywords=${keywords}&order=DESC`
    );
  }

  getProduct(productId: number) {
    return this.http.get<Product>(`api/products/v1.0/${productId}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`api/products/v1.0/`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`api/products/v1.0/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`api/products/v1.0/${productId}`);
  }
}
