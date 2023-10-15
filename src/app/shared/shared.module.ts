import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFieldComponent } from './components/autocomplete-field/autocomplete-field.component';
import { AngularMaterialUiModule } from '../angular-material-ui/angular-material-ui.module';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';

@NgModule({
  declarations: [InputFieldComponent, AutocompleteFieldComponent, DateFieldComponent, PrimaryButtonComponent],
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, AngularMaterialUiModule],
  exports: [InputFieldComponent, AutocompleteFieldComponent, DateFieldComponent, PrimaryButtonComponent],
})
export class SharedModule {}
