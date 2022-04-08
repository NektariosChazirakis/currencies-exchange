import {InjectionToken} from '@angular/core';
import {Settings} from '../interfaces/settings.interface';

export const settingsToken = new InjectionToken<Settings>('[Settings] Token');
