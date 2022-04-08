import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPickerComponent } from './currency-picker.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [CurrencyPickerComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, HttpClientModule],
  exports: [CurrencyPickerComponent]
})
export class CurrencyPickerModule { }
