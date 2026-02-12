import { Component, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pick-button',
  imports: [FontAwesomeModule],
  templateUrl: './pick-button.html',
  styleUrl: './pick-button.css',
})
export class PickButton {
  icon = input.required<IconDefinition>();
  text = input.required<string>();

  btnClick = output<void>();

  onClick() {
    this.btnClick.emit();
  }
}
