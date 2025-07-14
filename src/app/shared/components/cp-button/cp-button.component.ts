import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cp-button',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  styleUrl: './cp-button.component.scss',
  template: `
    <button
      mat-raised-button
      color="primary"
      (click)="onClick()"
      [class.full-width]="full"
    >
      <mat-icon *ngIf="iconName">{{ iconName }}</mat-icon>
      <span>{{ text }}</span>
    </button>
  `,
})
export class CpButtonComponent {
  @Input() text = '';
  @Input() iconName?: string;
  @Input() full = false;

  @Output() buttonClick = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
