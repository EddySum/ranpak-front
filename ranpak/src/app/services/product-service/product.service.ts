import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = `${environment.apiUrl}/product`

  constructor(private http: HttpClient) { }


  postProduct(product: any, file?: File | null, image?: File | null): Observable<Product> {
    let formParams = new FormData();
    if(file) formParams.append('file', file, file.name)
    if(image) formParams.append('image', image, image.name)

    formParams.append('data', JSON.stringify(product));

    return this.http.post<Product>(`${this.apiUrl}`, formParams, { withCredentials: true });
  }

  editProduct(product: any, file?: File | null, image?: File | null): Observable<Product> {
    let formParams = new FormData();
    if(file) formParams.append('file', file, file.name)
    if(image) formParams.append('image', image, image.name)

    formParams.append('data', JSON.stringify(product));

    return this.http.patch<Product>(`${this.apiUrl}/${product._id}`, formParams, { withCredentials: true });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { withCredentials: true });
  }
}
