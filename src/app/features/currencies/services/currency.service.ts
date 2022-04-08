import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {settingsToken} from '../../../settings/tockens/settings.tocken';
import {Settings} from '../../../settings/interfaces/settings.interface';
import {Currency} from '../interfaces/currency.interface';
import {map, Observable, switchMap, tap} from 'rxjs';

import { CLIENT_SETTINGS } from '../../../settings/tockens/client-settings';
import {ServerCurrencyResponse} from '../interfaces/server.currency.interface';
import {ServerConvertResponse} from '../interfaces/server.convert.interface';
import {CurrencyConversionInfo} from '../interfaces/currencyConversionInfo.interface';


@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(private httpClient: HttpClient) {}

  public getAllCurrencies(): Observable<Currency[]> {
    const endpoint = `${CLIENT_SETTINGS.api.base_url}/${CLIENT_SETTINGS.api.endpoints.symbols}`;
    let params = new HttpParams();
    params = params.set('access_key', CLIENT_SETTINGS.api.access_key);
    return this.httpClient.get<ServerCurrencyResponse>(endpoint, {params})
      .pipe(
        map((resp: ServerCurrencyResponse) => resp.symbols),
        map(resp => {
          const currenciesResp: Currency[] = [];
          for (const [key, value] of Object.entries(resp)) {
            currenciesResp.push({
              symbol: key,
              name: value
            })
          }
          return currenciesResp
        })
      )
  }

  public convertCurrency(currencyConversionInfo: CurrencyConversionInfo): Observable<ServerConvertResponse> {
    const endpoint = `${CLIENT_SETTINGS.api.base_url}/${CLIENT_SETTINGS.api.endpoints.convert}`;
    let params = new HttpParams();
    params = params.set('access_key', CLIENT_SETTINGS.api.access_key)
      .set('from', currencyConversionInfo.from)
      .set('to', currencyConversionInfo.to)
      .set('amount', currencyConversionInfo.amount)
    console.log(endpoint + '/' + params.toString());
    return this.httpClient.get<ServerConvertResponse>(endpoint, {params})
  }
}
