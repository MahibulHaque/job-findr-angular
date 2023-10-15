import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent implements OnInit {
  @Input() title: string = '';
  @Input() isDisabled: boolean = false;
  @Input() appearance: MatFormFieldAppearance = 'fill';
  maxDate: Date;
  @Input() maximumAge!: number;
  @Input() minimumAge!: number;
  @Input() controller!: FormControl;
  @Input() required: boolean = true;
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.maxDate = this.dateAdapter.today();
  }

  invalid = true;
  value: string = '';
  onChange = (val: any) => {};
  onTouched = () => {};

  touched = false;

  ngOnInit(): void {
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
        error: 'dobInvalidHigh',
        message: (err: any) => `Age needs to be lower than ${this.maximumAge}`,
      },
      {
        error: 'dobInvalidLow',
        message: (err: any) =>
          `Age needs to be greater than ${this.minimumAge}`,
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
