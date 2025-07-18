import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {
  ImageCroppedEvent,
  LoadedImage,
  ImageCropperComponent,
} from 'ngx-image-cropper';

@Component({
  selector: 'app-cp-image-cropper',
  templateUrl: './cp-image-cropper.component.html',
  styleUrls: ['./cp-image-cropper.component.scss'],
  standalone: true,
  imports: [ImageCropperComponent],
})
export class CpImageCropperComponent {
  private sanitizer = Inject(DomSanitizer);
  @Input() imageChangedEvent: Event | null = null;
  @Input() imageBase64: string | undefined = undefined;

  private _aspectRatio: number = 4 / 3;

  @Input()
  get aspectRatio(): number {
    return this._aspectRatio;
  }

  set aspectRatio(value: string | number) {
    if (typeof value === 'string') {
      const parts = value.split('/').map((part) => parseFloat(part.trim()));
      if (
        parts.length === 2 &&
        !isNaN(parts[0]) &&
        !isNaN(parts[1]) &&
        parts[1] !== 0
      ) {
        this._aspectRatio = parts[0] / parts[1];
      } else {
        console.warn(
          `Invalid aspectRatio string format: "${value}". Using default 4/3.`
        );
        this._aspectRatio = 4 / 3;
      }
    } else if (typeof value === 'number') {
      this._aspectRatio = value;
    }
  }
  @Input() resizeToWidth = 128;
  @Output() imageCropped = new EventEmitter<ImageCroppedEvent>();
  @Output() imageCroppedFile = new EventEmitter<Blob>();
  @Output() imageLoaded = new EventEmitter<LoadedImage>();
  @Output() cropperReady = new EventEmitter<void>();
  @Output() loadImageFailed = new EventEmitter<void>();
  @Output() imageCleared = new EventEmitter<void>();

  croppedImage: SafeUrl | string = '';

  constructor() {}

  onImageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.base64);
    }
    this.imageCropped.emit(event);
    if (event.blob) {
      this.imageCroppedFile.emit(event.blob);
    }
  }

  onImageLoaded(image: LoadedImage) {
    this.imageLoaded.emit(image);
  }

  onCropperReady() {
    this.cropperReady.emit();
  }

  onLoadImageFailed() {
    this.loadImageFailed.emit();
  }

  clearImage(): void {
    this.imageChangedEvent = null;
    this.croppedImage = '';
    this.imageCleared.emit();
  }
}
