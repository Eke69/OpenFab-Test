import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  breakpoint!: number;

  constructor(private productService: ProductsService) {
    let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();
    productsObservable.subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {
    if (window.innerWidth <= 415) {
      this.breakpoint = 1;
    }else if (window.innerWidth > 415 && window.innerWidth <= 750){
      this.breakpoint = 3;
    }else {
      this.breakpoint = 4;
    }
  }

  onResize(event: any) {
    if (window.innerWidth <= 415) {
      this.breakpoint = 1;
    }else if (window.innerWidth > 415 && window.innerWidth <= 750){
      this.breakpoint = 3;
    }else {
      this.breakpoint = 5;
    }
  }

}
