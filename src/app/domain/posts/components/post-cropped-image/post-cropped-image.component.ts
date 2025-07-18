import { Component, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CpImageCropperComponent } from '../../../../shared/components/cp-image-cropper/cp-image-cropper.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-cropped-image',
  standalone: true,
  imports: [CpImageCropperComponent, CommonModule],
  templateUrl: './post-cropped-image.component.html',
  styleUrl: './post-cropped-image.component.scss',
})
export class PostCroppedImageComponent implements OnInit {
  @Input() imageUrl: string = '';

  imageChangedEvent: Event | null = null;
  imageBase64: string | undefined = undefined;
  croppedImage: string | null | undefined = '';
  currentImage: string | null | undefined = '';
  isEditing = false;

  ngOnInit(): void {
    if (this.imageUrl) {
      this.currentImage = this.imageUrl;
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.imageBase64 = this.currentImage
      ? (this.currentImage as string)
      : undefined;
    this.imageChangedEvent = null;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.imageChangedEvent = null;
    this.imageBase64 = undefined;
  }

  onFileChangeEvent(event: Event): void {
    this.isEditing = true;
    this.imageChangedEvent = event;
    this.imageBase64 = undefined;
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.currentImage = event.base64;
    this.isEditing = false;
    this.imageChangedEvent = null;
    this.imageBase64 = undefined;
  }
}
