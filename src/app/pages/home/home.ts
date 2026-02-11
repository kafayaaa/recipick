import { Component } from '@angular/core';
import { Paragraph } from '../../components/paragraph/paragraph';
import { How } from '../../components/how/how';

@Component({
  selector: 'app-home',
  imports: [Paragraph, How],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
