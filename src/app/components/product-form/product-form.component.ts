import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm = this.fb.group({
    name: ['', [Validators.required]],
    productId: ['', Validators.required],
    info: [''],
    referenceNumber: [''],
    country: [''],
  });

  file: File | null = null;
  imageFile: File | null = null;

  countries$: Observable<Country[]> | null = null;

  @Output() submitProduct = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  onSubmit() {
    this.submitProduct.emit();
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(!fileList) throw Error('file list missing');

    this.file = fileList[0];
  }

  uploadImage(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(!fileList) throw Error('file list missing');

    this.imageFile = fileList[0];
  }

  getCountries() {
    this.countries$ = this.countryService.getCountries()
  }

}
