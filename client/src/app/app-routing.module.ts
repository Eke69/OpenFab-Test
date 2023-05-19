import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './screens/products/products.component';
import { ProductComponent } from './screens/product/product.component';
import { EditProductComponent } from './screens/edit-product/edit-product.component';
import { CreateProductComponent } from './screens/create-product/create-product.component';
import { LoginComponent } from './screens/login/login.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { authGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: 'products',
  component: ProductsComponent,
  pathMatch: 'full'
},
{
  path: 'products/:id',
  component: ProductComponent,
  canActivate: [authGuard]
},
{
  path: 'create-product',
  component: CreateProductComponent,
  canActivate: [authGuard]
},
{
  path: 'edit-product/:id',
  component: EditProductComponent,
  canActivate: [authGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
