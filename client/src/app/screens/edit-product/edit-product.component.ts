import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product, ProductForm } from 'src/app/types';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})

export class EditProductComponent implements OnInit {
  id: string = '';
  defaultValues!: Product;
  constructor(private router: Router, activatedRoute: ActivatedRoute, private productService: ProductsService) {
    this.id = activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    let productsObservable: Observable<Product>;
    productsObservable = this.productService.getProductById(this.id);
    productsObservable.subscribe((product) => {
      this.defaultValues = product;
    });
  }

onSubmit (formData: ProductForm) {
  this.productService.editProduct(formData, this.id).subscribe(_ => {
    this.id && this.router.navigateByUrl(`/products/${this.id}`)
  })
}
}
