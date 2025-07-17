import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CpImageCropperComponent } from '../../../../shared/components/cp-image-cropper/cp-image-cropper.component';
import { Post } from '../../models/posts-model';
import { CpFormFieldComponent } from '../../../../shared/components/cp-form-field/cp-form-field.component';
import { CpButtonComponent } from '../../../../shared/components/cp-button/cp-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CpImageCropperComponent,
    CpFormFieldComponent,
    MatDialogContent,
    MatDialogActions,
    CpButtonComponent,
    ReactiveFormsModule,
  ],
})
export class PostFormDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PostFormDialogComponent>);
  public data: { post?: Post } = inject(MAT_DIALOG_DATA);
  form: FormGroup;
  isEditMode: boolean;

  imageChangedEvent: Event | null = null;
  imageBase64: string | undefined = undefined;
  croppedImage: string | null = '';
  currentCroppedImagePreview: string | null = null;

  constructor() {
    this.isEditMode = !!this.data.post;

    this.form = this.fb.group({
      title: [this.data.post?.title || '', Validators.required],
      description: [this.data.post?.description || '', Validators.required],
      photo: [this.data.post?.photo || ''],
    });

    if (this.isEditMode && this.data.post?.photo) {
      this.croppedImage = this.data.post.photo;
    }
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    if (element.files?.length) {
      this.imageChangedEvent = event;
      this.imageBase64 = undefined;
    }
  }

  onImageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.currentCroppedImagePreview = event.base64;
    } else if (event.blob) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentCroppedImagePreview = reader.result as string;
      };
      reader.readAsDataURL(event.blob);
    }
  }

  discardImage(): void {
    this.imageChangedEvent = null;
    this.imageBase64 = undefined;
    this.croppedImage = '';
    this.currentCroppedImagePreview = null;
  }

  applyCrop(): void {
    this.croppedImage = this.currentCroppedImagePreview;
    this.form.get('photo')?.setValue(this.croppedImage);
    this.imageChangedEvent = null;
    this.imageBase64 = undefined;
    this.currentCroppedImagePreview = null;
  }

  reCropImage(): void {
    this.imageBase64 = this.croppedImage ?? undefined;
    this.imageChangedEvent = null;
    this.croppedImage = '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }

    const postData: Partial<Post> = { ...this.data.post, ...this.form.value };
    if (this.currentCroppedImagePreview && !this.croppedImage) {
      postData.photo = this.currentCroppedImagePreview;
    }
    this.dialogRef.close(postData);
  }
}
