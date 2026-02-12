import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { PickButton } from '../../components/pick-button/pick-button';
import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../../environments/environment';

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

  recipeResult = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  async analyzeImage() {
    const imageData = this.capturedImage();
    if (!imageData) return;

    this.isLoading.set(true);

    try {
      const genAI = new GoogleGenerativeAI(environment.geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const base64Data = imageData.split(',')[1];

      const prompt = `
        Lihat gambar bahan makanan ini. Sebutkan bahan apa saja yang ada, lalu berikan 1 saran resep masakan kreatif yang bisa dibuat dari bahan tersebut beserta langkah singkatnya.
      `;

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: 'image/png',
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;

      this.recipeResult.set(response.text());
    } catch (err) {
      console.error('Gagal menganalisis gambar: ', err);
      alert('Gagal menganalisis gambar. Silahkan coba lagi.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
