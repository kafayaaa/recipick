import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  imports: [],
  templateUrl: './paragraph.html',
  styleUrl: './paragraph.css',
})
export class Paragraph {
  @Input() title!: string;
}
