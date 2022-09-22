import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatestWith, Observable, pipe, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productSubject = new BehaviorSubject<Product[]>([]);
  products$: Observable<Product[]> = this.productSubject.asObservable();

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

  

}
