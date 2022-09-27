import { Pipe, PipeTransform } from '@angular/core';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country/country.service';
import { countryList } from '../../country-data';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(countryCode: string): string {
    return countryList.find((country: Country) => country.code === countryCode)?.name ?? countryCode
  }

}
