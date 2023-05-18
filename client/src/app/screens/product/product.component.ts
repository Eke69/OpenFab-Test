import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  id: string | undefined;
  
  constructor(private _route: ActivatedRoute, private router: Router, private productsService: ProductsService){
    _route.params.subscribe(params => {
      if(params['id']) {
        this.id = params['id'];
        productsService.getProductById(params['id']).subscribe(product => {
          this.product = product;
        })
      }
    });

  }
  ngOnInit(): void {
    
  }

  onDelete(): void {
    if (this.id) {
      this.productsService.deleteProduct(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/products');
        },
      })
    }    
  }
}
