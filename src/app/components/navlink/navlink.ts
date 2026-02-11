import { Component, input } from '@angular/core';

@Component({
  selector: 'app-navlink',
  imports: [],
  templateUrl: './navlink.html',
  styleUrl: './navlink.css',
})
export class Navlink {
  href = input<string>('/');
  title = input.required<string>();
  isActive = input<boolean>(false);
}
