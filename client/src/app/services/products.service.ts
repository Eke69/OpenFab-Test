import { Injectable } from '@angular/core';
import { Product, ProductForm } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CREATE_PRODUCT_URL, DELETE_PRODUCT_URL, EDIT_PRODUCT_URL, PRODUCTS_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_URL + id);
  }

  createProduct(product: ProductForm){
    return this.http.post<Product>(CREATE_PRODUCT_URL, product);
  }

  editProduct(product: ProductForm, id: string){
    return this.http.patch<Product>(`${EDIT_PRODUCT_URL}${id}`, product);
  }

  deleteProduct(id: string){
    return this.http.delete<Product>(`${DELETE_PRODUCT_URL}${id}`);
  }
}
