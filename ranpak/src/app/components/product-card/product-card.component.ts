import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() deleteProduct = new EventEmitter<void>();
  @Output() editProduct = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  

}
