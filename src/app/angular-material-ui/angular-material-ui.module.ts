import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
const AngularMaterialUIComponents = [
  MatAutocompleteModule,
  MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatStepperModule,
  MatSelectModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatCardModule,
  MatTabsModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatDialogModule,
];

@NgModule({
  imports: [AngularMaterialUIComponents],
  exports: [AngularMaterialUIComponents],
})
export class AngularMaterialUiModule {}
