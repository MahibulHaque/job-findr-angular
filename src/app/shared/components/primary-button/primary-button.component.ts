import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
})
export class PrimaryButtonComponent {
  @Input() type: string = 'button';
  @Input() text: string = '';
  @Input() isDisabled: boolean = false;
  @Output() clicked = new EventEmitter();
  handleClick(): void {
    this.clicked.emit();
  }
}
