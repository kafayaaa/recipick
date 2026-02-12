import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { PickButton } from '../../components/pick-button/pick-button';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pick',
  imports: [PickButton],
  templateUrl: './pick.html',
  styleUrl: './pick.css',
})
export class Pick {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  faCamera = faCamera;
  faImage = faImage;

  capturedImage = signal<string | null>(null);
  isCameraOpen = signal<boolean>(false);
  private stream: MediaStream | null = null;

  async openCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      this.isCameraOpen.set(true);
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (err) {
      console.error('Gagal mengkases kamera: ', err);
      alert('Izin kamera ditolak atau tidak tersedia.');
    }
  }

  takeSnapshot() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    const imageData = canvas.toDataURL('image/png');
    this.capturedImage.set(imageData);

    this.closeCamera();
  }

  closeCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());

      this.isCameraOpen.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target?.result as string;
        this.capturedImage.set(imageBase64);
      };
      reader.readAsDataURL(file);

      input.value = '';
    }
  }
}
