import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cp-button',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <button mat-button (click)="action.emit()">
      <mat-icon *ngIf="icon">{{ icon }}</mat-icon>
      <span>{{ text }}</span>
    </button>
  `,
})
export class CpButtonComponent {
  @Input() icon?: string;
  @Input() text = '';

  @Output() action = new EventEmitter<void>();
}
