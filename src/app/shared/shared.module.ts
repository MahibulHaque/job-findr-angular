import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteFieldComponent } from './components/autocomplete-field/autocomplete-field.component';
import { AngularMaterialUiModule } from '../angular-material-ui/angular-material-ui.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import { DateFieldComponent } from './components/date-field/date-field.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { TopNavbarComponent } from './components/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';
import {
  JobDescriptionDialogComponent,
  JobDescriptionDialogContent,
} from './components/job-description-dialog/job-description-dialog.component';
import { FilterMenuComponent } from './components/filter-menu/filter-menu.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    InputFieldComponent,
    AutocompleteFieldComponent,
    DateFieldComponent,
    PrimaryButtonComponent,
    TopNavbarComponent,
    JobDescriptionDialogComponent,
    JobDescriptionDialogContent,
    FilterMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    AngularMaterialUiModule,
    MatRadioModule,
    MatSliderModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    InputFieldComponent,
    AutocompleteFieldComponent,
    DateFieldComponent,
    PrimaryButtonComponent,
    TopNavbarComponent,
    JobDescriptionDialogComponent,
    JobDescriptionDialogContent,
    FilterMenuComponent,
  ],
})
export class SharedModule {}
