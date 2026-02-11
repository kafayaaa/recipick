import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-how',
  imports: [],
  templateUrl: './how.html',
  styleUrl: './how.css',
})
export class How {
  @Input() image!: string;
  @Input() title!: string;
}
