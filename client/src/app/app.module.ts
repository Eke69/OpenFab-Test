import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDesignModule } from './mat-design/mat-design.module';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './screens/products/products.component';
import { ProductComponent } from './screens/product/product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { EditProductComponent } from './screens/edit-product/edit-product.component';
import { CreateProductComponent } from './screens/create-product/create-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './screens/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ProductComponent,
    ProductCardComponent,
    EditProductComponent,
    CreateProductComponent,
    ProductFormComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDesignModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }
    )
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
