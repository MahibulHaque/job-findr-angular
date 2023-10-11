import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  inputValue: string = ''; // Initialize with an empty string
  @Output() valueChange = new EventEmitter<string>();
  onInputChange(event: any) {
    // Access the value of the input field
    const newValue = event.target.value;
    this.valueChange.emit(newValue);
  }
  constructor() {}

  ngOnInit(): void {}
}
