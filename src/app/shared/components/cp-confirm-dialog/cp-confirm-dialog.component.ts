import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-cp-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Não</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sim</button>
    </div>
  `,
  standalone: true,
  imports: [MaterialModule],
})
export class CpConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<CpConfirmDialogComponent>);
  public data: DialogData = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
