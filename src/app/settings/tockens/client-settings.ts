import {Settings} from '../interfaces/settings.interface';

export const CLIENT_SETTINGS: Settings = {
  api : {
    access_key: '54e08abc6c53f7374158e560e714bcfa',
    base_url: 'http://data.fixer.io/api/',
    endpoints: {
      symbols: 'symbols',
      convert : 'convert'
    }
  }
}
