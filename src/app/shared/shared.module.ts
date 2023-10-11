import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
