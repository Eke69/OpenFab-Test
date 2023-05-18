import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductForm } from 'src/app/types';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.sass']
})
export class CreateProductComponent implements OnInit {
  defaultValues!: ProductForm;
  constructor(private router: Router, private productService: ProductsService) {

  }
  ngOnInit(): void {
    this.defaultValues = {
      name: '',
      description: '',
      price: '',
    } 
  }

  onSubmit (formData: ProductForm) {
    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/products');
      },
    })
  }
}
