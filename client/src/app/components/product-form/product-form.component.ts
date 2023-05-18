import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from 'src/app/types';
import { GetFormError } from 'src/app/utils/getError';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() defaultValues!: ProductForm;
  @Output() onSubmit = new EventEmitter<ProductForm>();

  isSubmitted = false;
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      {
        name : [this.defaultValues?.name, Validators.required],
        description : [this.defaultValues?.description, Validators.required],
        price : [String(this.defaultValues?.price), Validators.required],
      }
    )
  }

  getFieldError(fieldName: string) {
    return GetFormError.getFieldError(fieldName, this.productForm, this.isSubmitted);
  }

  _onSubmit(): void {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      return;
  }
  this.onSubmit.emit({
    name : this.productForm.value.name as string,
    description : this.productForm.value.description as string,
    price : Number(this.productForm.value.price),
  });
  }
}
