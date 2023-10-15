import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputFieldComponent,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() title: string = '';
  @Input() inputType: string = 'text';
  @Input() placeholder: string = '';
  @Input() isDisabled: boolean = false;
  @Input() required: boolean = false;
  @Input() minLength: number = 0;
  @Input() maxLength: number = 100;
  @Input() controller!: FormControl;
  @Input() appearance: MatFormFieldAppearance = 'fill';

  invalid = true;
  value: string = '';
  onChange = (val: any) => {};
  onTouched = () => {};

  touched = false;

  ngOnInit() {
    if (this.isDisabled) this.controller.disable();
  }
  onValueChange(evt: any) {
    this.markTouched();
    
    this.onChange(evt.target.value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.isDisabled = disabled;
  }

  getErrorMessage() {
    const allPossibleErrors = [
      {
        error: 'email',
        message: (err: any) => 'Please enter a valid email address',
      },
      {
        error: 'min',
        message: (err: any) => `Value cannot be less than ${err.min}`,
      },
      {
        error: 'minlength',
        message: (err: any) =>
          `Input must be at least ${err.requiredLength} character long`,
      },
      {
        error: 'max',
        message: (err: any) => `Value cannot be greater than ${err.max}`,
      },
      {
        error: 'required',
        message: (err: any) => 'This field is required',
      },
    ];
    for (const { error, message } of allPossibleErrors) {
      if (this.controller.hasError(error)) {
        return message(this.controller.errors?.[error]);
      }
    }
    return null;
  }

  markTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}