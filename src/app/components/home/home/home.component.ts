import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatestWith, Observable, pipe, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ProductFormComponent } from '../../product-form/product-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productSubject.asObservable();

  view: 'add-form' | 'list' = 'list';

  editingProduct: Product | null = null;

  @ViewChild(ProductFormComponent) productFormComp: ProductFormComponent | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(take(1)).subscribe({
      next: (products) => this.productSubject.next(products)
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product._id).pipe(
      combineLatestWith(this.products$),
      take(1)).subscribe({
        next: ([deleteResp, products]) => {
          const newProductsArr = products.filter(prod => prod._id !== product._id);
          this.productSubject.next(newProductsArr)
        }
      });
  }

  openProductForm() {
    this.view = 'add-form';
  }

  openProductEdit(product: Product) {
    this.editingProduct = product
    this.view = 'add-form';
  }

  editOrAddProduct() {
    if(this.editingProduct) {
      this.submitProductEdits();
      this.editingProduct = null;
    } else {
      this.createProduct()
    }
  }

  submitProductEdits() {
    const productForm = this.productFormComp?.productForm.value;

    const product = {
      ...this.editingProduct,
      ...productForm
    }

    this.productService.editProduct(product, this.productFormComp?.file, this.productFormComp?.imageFile).pipe(
      combineLatestWith(this.products$),
      take(1)).subscribe({
        next: ([editedProduct, products]) => {
          const newProductList = [...products];
          const idx = newProductList.findIndex(product => editedProduct._id === product._id);

          newProductList[idx] = editedProduct;
          this.productSubject.next(newProductList);

          this.view = 'list';
        }
      });
  }

  createProduct() {
    const productForm = this.productFormComp?.productForm.value;

    const product = {
      ...productForm
    }

    this.productService.postProduct(product, this.productFormComp?.file, this.productFormComp?.imageFile).pipe(
      combineLatestWith(this.products$),
      take(1)).subscribe({
        next: ([newProduct, products]) => {
          const newProductsArr = [...products];
          newProductsArr.push(newProduct);
          this.productSubject.next(newProductsArr);

          this.view = 'list';
        }
      });
  }

  

}
