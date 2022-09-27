import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from 'src/app/models/country';
import { countryList } from 'src/app/util/country-data';

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  constructor() { }

  getCountries(): Observable<Country[]> {
    //TODO: Pick and connect to a public API for a list of countries
    
    return of(countryList)
  }
}
