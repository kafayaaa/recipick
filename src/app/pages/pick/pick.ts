import { Component } from '@angular/core';
import { PickButton } from '../../components/pick-button/pick-button';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pick',
  imports: [PickButton],
  templateUrl: './pick.html',
  styleUrl: './pick.css',
})
export class Pick {
  faCamera = faCamera;
  faImage = faImage;
}
