import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Post } from '../../models/posts-model';
import { MaterialModule } from '../../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { CpFormFieldComponent } from '../../../../shared/components/cp-form-field/cp-form-field.component';

@Component({
  selector: 'app-post-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule,
    ReactiveFormsModule,
    CpFormFieldComponent,
  ],
  templateUrl: './post-form-dialog.component.html',
  styleUrl: './post-form-dialog.component.scss',
})
export class PostFormDialogComponent {
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<PostFormDialogComponent>);
  public data: { post?: Post } = inject(MAT_DIALOG_DATA);
  form: FormGroup;
  isEditMode: boolean;

  constructor() {
    this.isEditMode = !!this.data.post;

    this.form = this.fb.group({
      id: [this.data.post?.id],
      title: [this.data.post?.title || '', Validators.required],
      body: [this.data.post?.description || '', Validators.required],
      imageUrl: [
        this.data.post?.photo || 'https://picsum.photos/300/200',
        Validators.required,
      ],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
