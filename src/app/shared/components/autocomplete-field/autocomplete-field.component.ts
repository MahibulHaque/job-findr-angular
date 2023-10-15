import { Component, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete-field',
  templateUrl: './autocomplete-field.component.html',
  styleUrls: ['./autocomplete-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AutocompleteFieldComponent,
    },
  ],
})
export class AutocompleteFieldComponent implements OnInit {
  @Input() controller!: FormControl;
  @Input() title: string = '';
  @Input() options!: string[];
  @Input() required: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() placeholder:string = ''
  @Input() appearance: MatFormFieldAppearance = 'fill';
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.controller.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    if (this.isDisabled) this.controller.disable();
  }

  invalid = true;
  value: string = '';
  onChange = (val: any) => {};
  onTouched = () => {};

  touched = false;


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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  markTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
