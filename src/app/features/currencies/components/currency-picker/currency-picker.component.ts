import {Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Currency} from '../../interfaces/currency.interface';

@Component({
  selector: 'app-currency-picker',
  templateUrl: './currency-picker.component.html',
  styleUrls: ['./currency-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyPickerComponent),
      multi: true
    }
  ]
})
export class CurrencyPickerComponent implements OnChanges, ControlValueAccessor  {

  @Input() currencies: Currency[] = [];
  @Input() excludeCurrencySymbol: string = '';
  @Input() label: string = '';

  filteredCurrencies: Currency[] = [];

  currencyControl = new FormControl();

  public onChange = (value: any) => {};
  public onTouched = (value: any) => {};

  constructor() {}

  ngOnChanges(changes:SimpleChanges): void {

      if (this.excludeCurrencySymbol !== '') {
        this.filteredCurrencies = this.currencies.filter((currency) => currency.symbol !== this.excludeCurrencySymbol)
      } else {
        this.filteredCurrencies = this.currencies;
      }


  }

  writeValue(value: any) {
    if (value) {
      this.currencyControl.patchValue(value);
    } else {
      this.currencyControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  optionSelected(currencySymbol: string) {
    this.onChange(currencySymbol);
  }

}
