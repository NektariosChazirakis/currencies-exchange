import {Component, OnInit} from '@angular/core';
import {CurrencyService} from './features/currencies/services/currency.service';
import {Currency} from './features/currencies/interfaces/currency.interface';
import {Observable, of} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ServerConvertResponse} from './features/currencies/interfaces/server.convert.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'currencies-exchange';

  currencies$: Observable<Currency[]> = of([])

  conversionResult$!: Observable<ServerConvertResponse>;

  excludeCurrencyFromSymbol: string = '';
  excludeCurrencyToSymbol: string = '';

  exchangeForm: FormGroup = this.fb.group({
    amount: [null, [Validators.required, Validators.min(1), Validators.pattern('^[1-9]\\d*(\\.\\d+)?$')]],
    from: [null, Validators.required],
    to: [null, Validators.required]
  })

  constructor(private currencyService: CurrencyService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.currencies$ = this.currencyService.getAllCurrencies();
  }

  get amount() {
    return this.exchangeForm.get('amount');
  }

  get fromCurrency() {
    return this.exchangeForm.get('fromCurrency');
  }

  get toCurrency() {
    return this.exchangeForm.get('toCurrency');
  }

  onSubmit(): void {
    this.conversionResult$ = this.currencyService.convertCurrency(this.exchangeForm.value);
  }

  onFromCurrencyChange(currencySymbol: any) {
    this.excludeCurrencyFromSymbol = currencySymbol;
  }

  onToCurrencyChange(currencySymbol: any) {
    this.excludeCurrencyToSymbol = currencySymbol
  }

}
